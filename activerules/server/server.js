'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
// Internationalization (i18n) library
var i18n = require("i18next");
var i18nMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');

i18n
    .use(Backend)  
    .use(i18nMiddleware.LanguageDetector)    
    .init({
    ignoreRoutes: ['images/', 'public/', 'css/', 'js/'],
    backend: {
      loadPath: '/home/brian/sandbox/loopback-app/activerules/common/ar/locales/{{lng}}/{{ns}}.json',
      addPath: '/home/brian/sandbox/loopback-app/activerules/common/ar/locales/{{lng}}/{{ns}}.missing.json'
    },
    lngWhitelist: ['en'],
    fallbackLng: 'en',
    preload: ['en'],
    saveMissing: true,
    ns: ['site'], 
    defaultNs: 'site',
  //  debug: true
});

app.use(i18nMiddleware.handle(i18n, {
  ignoreRoutes: ["/css", "/js"],
  removeLngFromUrl: false
}));


//console.log(i18n.t('site:name'));
 

var cookieParser = require('cookie-parser');
var session = require('express-session');

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash = require('express-flash');

// Build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
  }
  require('socketio-auth')(app.io, {
    authenticate: function(socket, value, callback) {
      var AccessToken = app.models.AccessToken;
          // get credentials sent by the client
      var token = AccessToken.find({
        where: {
          and: [{userId: value.userId}, {id: value.id}],
        },
      }, function(err, tokenDetail) {
        if (err) throw err;
        if (tokenDetail.length) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }); // find function..
    }, // authenticate function..
  });

  app.io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
});
