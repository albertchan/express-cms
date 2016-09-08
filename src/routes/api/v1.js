export default (server) => {

  server.get('/api/v1/heartbeat', (req, res) => {
    res.send("It's alive!");
  });
}
