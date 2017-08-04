'use strict';

var path = require('path');

// ActiveRules default view directory.
// Some modules or routes will have default views in a different directory.
var defaultViewRoot = path.resolve('./server/views/');
// ActiveRules root, config, l10n and site specfifc view may exist below here.
var arRoot = path.resolve('./common/ar/config');

// ActiveRules view resolver will test for site view overrides
var avr = require('../activerules-view-resolver');
avr.init(defaultViewRoot, arRoot);
 
// ROUTES
module.exports = function(app) {
    // Homepage
  app.get('/', function(req, res) {
    avr.resolvePage('home', req, defaultViewRoot)
        .then(function(html) {
          res.send(html);
        });
  });

    // Health check router
  app.get('/server-health', function(req, res) {
    res.json({running: true});
  });
};

