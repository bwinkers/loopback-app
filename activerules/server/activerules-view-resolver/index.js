'use strict';

var _ = require('lodash');

var hbs = require('handlebars');

// Promisified core Node functions
var fs = require('mz/fs');

var AR = function(){};

/**
 * Initializer function to set required paths in object
 * 
 * @param {type} defaultViewRoot
 * @param {type} arRoot
 * @returns {undefined}
 */
AR.prototype.init = function(defaultViewRoot, arRoot){
    AR.prototype.defaultViewRoot = defaultViewRoot;
    AR.prototype.arRoot = arRoot;
}

/**
 * Provides site specific page template and data
 * 
 * @param {type} page
 * @param {type} request
 * @param {type} viewRoot
 * @returns {Promise}
 */
AR.prototype.resolvePage = function(page, request, viewRoot) {

    var viewPath; // The path of the view regardless of root.
    var siteView; // View served for this site
    var template; // Compile Handlebars template
    var html; // Compiled template with data injected
    
    return new Promise(
        function(resolve, reject) {
            
            viewPath = '/page/' + page + '.hbs';
            
            siteView = AR.prototype.arRoot + '/site/' + request.ar.site.site + '/views/' + viewPath;
            
            if(!fs.existsSync(siteView)) {
                siteView = AR.prototype.defaultViewRoot + viewPath;
            }
            
            // Try loading the view w/ data
            try {
                fs.readFile(siteView, 'utf8')
                 .then(function(fileContent) {
                     template = hbs.compile(fileContent);
                     getPageData(page, request)
                     .then(function(pageData) {
                         html = template(pageData);
                         resolve(html);
                     });
                 });  
            } catch (err) {
              reject(err);
            }
        }
    );
};

/**
 * This merges the site page data for a locale over the default page data for a locale.
 * 
 * @param {type} page
 * @param {type} request
 * @returns {Promise}
 */
function getPageData(page, request) {
    return new Promise(
        function(resolve, reject) {
          try {
            resolve({test: 'data'});
          } catch (err) {
            reject(err);
          }
        }
    );
}
;

module.exports = exports = new AR();
