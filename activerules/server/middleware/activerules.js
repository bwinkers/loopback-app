var AR = require('./ar');
ar = new AR('.');

module.exports = function(options) {
  return function activeRules(req, res, next) {
    // use options to control handler's behavior
    
    ar.getSiteByHost(req.headers.host, '../../ar')
    .then(function (site) {
        req.ar = ar;
        console.log('ActiveRules initialized site: ' + site.site);
        next();
    })
    .catch(function (err) {
        
        console.log(err.message);
        
        res.status(404) // HTTP status 404: NotFound
        .send('Domain or host support not found');
    });
  }
};
