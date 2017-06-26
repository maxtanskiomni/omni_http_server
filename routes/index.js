const storageRoutes = require('./storage_routes');

module.exports = function(app, db) {
  storageRoutes(app, db);
  // Other route groups could go here, in the future
};
