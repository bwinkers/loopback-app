'use strict';

var avr = require('../activerules-view-resolver');

module.exports = function(app) {
    // Homepage
  app.get('/', function(req, res) {
    avr.resolvePage('home', req, '../views/')
        .then(function(html) {
          res.send(html);
        });
  });

    // Health check router
  app.get('/server-health', function(req, res) {
    res.json({running: true});
  });
};

