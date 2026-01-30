require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: { origin: "*" },
});

// 🔥 THIS LINE IS CRITICAL
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
