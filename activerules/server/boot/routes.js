'use strict';

var path = require('path');

// ActiveRules root, config, l10n and site specfifc view may exist below here.
var arRoot = path.resolve('./common/ar');

// ActiveRules view resolver will test for site view overrides
var view = require('activerules-viewmaster');
view.init(arRoot);
 
// ROUTES
module.exports = function(app) {
    // Homepage
  app.get('/', function(req, res) {
    view.hydrate('home', req)
        .then(function(html) {
          res.send(html);
        });
  });

    // Health check router
  app.get('/server-health', function(req, res) {
    res.json({running: true});
  });
};

