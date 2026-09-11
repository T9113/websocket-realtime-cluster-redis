function configureHeartbeat(io, pingIntervalMs = 25000, pingTimeoutMs = 20000) {
  io.opts.pingInterval = pingIntervalMs;
  io.opts.pingTimeout = pingTimeoutMs;
}
module.exports = { configureHeartbeat };
