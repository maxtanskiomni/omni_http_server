
var request = require('request');


module.exports = function(app, firebase) {
  app.get('/accounts/add_user', (req, res) => {

  });

  app.post('/images/upload_image', (req, res) => {
    console.log(req.body)
    const body = req.body;

    request.post({
      url: 'https://connect.stripe.com/oauth/token',
      form: {
        grant_type: "authorization_code",
        client_id: 'ca_Anhby1WlgOAgEfmTJLBillU2n4XLfcGp',
        code: code,
        client_secret: 'sk_test_374YDFt8xuIdxPandlSZQBo3'
      }
    }, function(err, r, body) {

      var access_token = JSON.parse(body).access_token;
      var refresh_token = JSON.parse(body).refresh_token;
      var stripe_user_id = JSON.parse(body).stripe_user_id;

      let user_account = {
        stripe_user_id: stripe_user_id,
        refresh_token: refresh_token,
        access_token: access_token,
      };

      firebase.updateFB('organizations', state, user_account);
      res.send('success');
    });

  });

  app.delete('/accounts/:id', (req, res) => {

    });
  };
