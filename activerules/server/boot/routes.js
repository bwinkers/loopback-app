module.exports = function(app) {
  // Add a simple server health check router
  app.get('/server-health', function(req, res) {
    res.json({ running: true });
  });
}

