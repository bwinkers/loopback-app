'use strict';

// Awesome utilities
var _ = require('lodash');

// Standard semantic template support
var hbs = require('handlebars');

// Promisified core Node functions
var fs = require('mz/fs');

// Internationalization (i18n) library
var i18n = require("i18next");
var i18nOptions = {
    supportedLngs: ['en']
    ignoreRoutes: ['images/', 'css/', 'js/']
}
i18n.init(i18nOptions);

/**
 * Create a function returning an empty object
 */
var AR = function(){};

/**
 * Initializer function to set required paths in object
 * 
 * @param string arRoot
 * @returns null
 */
AR.prototype.init = function(arRoot){
    // The root for ActiveRules files
    AR.prototype.arRoot = arRoot;
}

/**
 * Provides site specific page template and data
 * 
 * @param string page
 * @param object request
 * @returns {Promise}
 */
AR.prototype.resolvePage = function(page, request) {

    var viewPath; // The path of the view regardless of root.
    var siteView; // View served for this site
    var template; // Compile Handlebars template
    var html; // Compiled template with data injected
    
    return new Promise(
        function(resolve, reject) {
            
            viewPath = '/page/' + page + '.hbs';
            
            siteView = AR.prototype.arRoot + '/site/' + request.ar.site.site + '/views/' + viewPath;
            
            if(!fs.existsSync(siteView)) {
                siteView = AR.prototype.arRoot + '/views/' + viewPath;
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
 * We use the i18next libraries to manage localizing site content
 * 
 * @param string page
 * @param object request
 * @returns {Promise}
 */
AR.prototype.getPageData = getPageData;


function getPageData(page, request) {
    return new Promise(
        function(resolve, reject) {
            try {

                var option = { resGetPath: AR.prototype.arRoot + '/i18n/__lng__/__ns__.json' };

                i18n.init(option);
                var data = 
                resolve({test: 'data'});
            } catch (err) {
              reject(err);
            }
        }
    );
};
/**
 * Export a new instance of the ActiveRules view resolver
 */
module.exports = exports = new AR();
