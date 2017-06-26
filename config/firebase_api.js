
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyDKqIvmH6RtSW620Kq-3UCatGFdNJXaYOI",
  authDomain: "carchar-81ed2.firebaseapp.com",
  databaseURL: "https://carchar-81ed2.firebaseio.com",
  projectId: "carchar-81ed2",
  storageBucket: "carchar-81ed2.appspot.com",
  messagingSenderId: "770547282980"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);


class FirebaseAPI{
  constructor(){
    this.firebaseApp = firebaseApp;
    this.database = firebaseApp.database();
    this.usersRef = this.database.ref('users')
    this.accountsRef = this.database.ref('accounts')
    this.transactionsRef = this.database.ref('transactions')
  }

//Firebase Auth methods and observers
  register(email, password){
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
     .catch(function (err) {
       console.log(err)
     });
   }

  siginIn(email, password){
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
     .catch(function(err) {
       console.log(err)
     });
   }

  signOut(){
    firebaseApp.auth().signOut()
     .catch(function (err) {
       console.log(err)
     });
  }

  addAuthObserver(method){
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        global.user = user; // user is undefined if no user signed in
      }else{
        global.user = null;
      }
      method
    });
  }

//Firebase Database methods
  getUsers(parent){
    this.usersRef.orderByKey()
    .on('value', (users) => {
      parent.setState({users: users});
    });
  }

  getCurrentUser(parent, email){
    this.usersRef.orderByChild('email')
    .equalTo(email)
    .on('value', (currentUser) => {
      parent.setState({currentUser: currentUser});
    });
  }

  getUserAccounts(parent, email){
    this.accountsRef.orderByChild('owner')
    .equalTo(email)
    .on('value', (accounts) => {
      parent.setState({accounts: accounts});
    });
  }

  getUserTransactions(parent, email){
    this.transactionsRef.orderByChild('payer')
    .equalTo(email)
    .on('value', (transactions) => {
      parent.setState({payerTransactions: transactions});
    });
    this.transactionsRef.orderByChild('recipient')
    .equalTo(email)
    .on('value', (transactions) => {
      parent.setState({recievedTransactions: transactions});
    });
  }

  insertFB(table, data){
    if(['users', 'accounts', 'transactions'].indexOf(table)<0){
      console.log('incorrect table reference')
      return false
    }
    var newKey = this.database.ref().child(table).push().key;
    this.database.ref(table + '/' + newKey).set(data);
    return true
  }

  updateFB(table, key, updateObject){
    if(['users', 'accounts', 'transactions', 'organizations'].indexOf(table)<0){
      console.log('incorrect table reference')
      return
    }
    this.database.ref(table + '/' + key).update(updateObject);
  }

  deleteRecord(table, key) {
    if(['users', 'accounts', 'transactions'].indexOf(table)<0){
      console.log('incorrect table reference')
      return
    }
    this.database.ref(table + '/' + key).remove();
  }
}

module.exports = {
  FirebaseAPI : FirebaseAPI
};
