const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

const pubClient = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  io.on("connection", (socket) => {
    socket.on("broadcast", (data) => socket.broadcast.emit("message", data));
  });
  httpServer.listen(3000, () => console.log("WebSocket cluster listening on 3000"));
});
