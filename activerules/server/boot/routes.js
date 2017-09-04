'use strict';

var arView = require('/home/brian/sandbox/loopback-app/activerules-views');

module.exports = function(app) {
  
  
  app.get('/', function(req, res) {
    
    arView.sendPage(req, res, 'home');
    
    
    
  });
  
  // Add a simple server health check router
  app.get('/server-health', function(req, res) {
    res.json({ running: true });
  });
}

