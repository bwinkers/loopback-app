'use strict';

var arRoot = '/home/brian/sandbox/loopback-app/activerules/common/ar/';

var arView = require('/home/brian/sandbox/loopback-app/activerules-views');
arView.init({arRoot: arRoot});

var arAPI = require('/home/brian/sandbox/loopback-app/activerules-module-api-wrapper');
arView.init({arRoot: arRoot});

module.exports = function(app) {

  app.get('/', function(req, res) {
    arView.sendPage(req, res, 'home');
  });
  
  app.get('/login', function(req, res) {
    arView.sendForm(req, res, 'login');
  });
  
  app.get('/api/products', function(req, res) {
    arAPI.read(req, res, 'products');
  });
  
  // Add a simple server health check router
  app.get('/server-health', function(req, res) {
    res.json({ running: true });
  });
}

