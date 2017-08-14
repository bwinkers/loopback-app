'use strict';

var path = require('path');

const i18n = require('i18next');
const Backend = require('i18next-node-fs-backend');

var _ = require("lodash");



// ActiveRules root, config, l10n and site specfifc view may exist below here.
var arRoot = path.resolve('./common/ar');

// ActiveRules view resolver will test for site view overrides
var avr = require('activerules-view-resolver');
avr.init(arRoot);
 
// ROUTES
module.exports = function(app) {
    // Homepage
  app.get('/', function(req, res) {


        var sharedConfig = require("/home/brian/sandbox/loopback-app/activerules/common/ar/locales/en/site.json");
        var siteConfig = require("/home/brian/sandbox/loopback-app/activerules/common/ar/site/izzup/locales/en/site.json");
      
      var configs = _.merge(sharedConfig, siteConfig);
      
      console.log(configs);
      
      var resources = {
                en: {
                    translation: {
                        "site": configs
                        }
                    }
                
            };
        
    i18n
    .init(
        {
            lng: 'en',
           // debug: true,
            resources: resources

        }, function(err, t) { 
  console.log(t('site.name', {returnObjectTrees: true}));
});
        
//console.log(req.i18n.t('site:name')); // key in common namespace
    avr.resolvePage('home', req)
        .then(function(html) {
          res.send(html);
        });
  });

    // Health check router
  app.get('/server-health', function(req, res) {
    res.json({running: true});
  });
};

