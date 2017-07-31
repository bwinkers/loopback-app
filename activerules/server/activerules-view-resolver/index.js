'use strict';

var _ = require('lodash');

var hbs = require('handlebars');
// Promisified core Node functions
var fs = require('mz/fs');

var AR = function() {};

AR.prototype.resolvePage = function(page, request, viewRoot) {
  return new Promise(
        function(resolve, reject) {
          try {
            var templateFile = false;

              // use site specifc view if provided
            if (typeof request.ar.site.viewRoot != 'undefined') {
              var siteViewRoot = request.ar.site.viewRoot;

              try {
                templateFile = require.resolve(siteViewRoot + 'page/' + page + '.hbs');
              } catch (err) {
                        // Np, lets use the default view
              }
            }

            if (!templateFile) {
              templateFile = require.resolve(viewRoot + 'page/' + page + '.hbs');
            }

            fs.readFile(templateFile, 'utf8')
                  .then(function(fileContent) {
                    var template = hbs.compile(fileContent);
                    getPageData(page, request)
                      .then(function(pageData) {
                        var html = template(pageData);
                        resolve(html);
                      })
                      .catch(function(err) {
                        throw err;
                      });
                  })
                  .catch(function(err) {
                    throw err;
                  });
          } catch (err) {
            reject(err);
          }
        }
    );
};

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
