module.exports = function() {
  return function performance_tracker(req, res, next) {
    var start = process.hrtime();
    res.once('finish', function() {
      var diff = process.hrtime(start);
      var ms = diff[0] * 1e3 + diff[1] * 1e-6;
      console.log('Request for %s served in %d ms.', req.url, ms);
    });
    next();
  };
};