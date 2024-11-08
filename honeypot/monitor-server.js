const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Receber informacoes dos honeypots e transmitir para o dashboard
io.on("connection", (socket) => {
  console.log("A honeypot connected.");

  socket.on("honeypotData", (data) => {
    console.log("Data received from honeypot:", data);
    io.emit("monitorUpdate", data); // Enviar para a dashboard
  });

  socket.on("disconnect", () => {
    console.log("A honeypot disconnected.");
  });
});

server.listen(3000, () => {
  console.log("Monitoring server is running on http://localhost:3000");
});
