const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const ioClient = require("socket.io-client");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://scaling-tribble-x4wgwvggj55f9pgx-3012.app.github.dev",
    methods: ["GET", "POST"],
  }
});

const failoverServers = ["http://localhost:3013", "http://localhost:3014"];
let activeConnections = 0;
let totalRequests = 0;
const attackLogs = [];  // Para registrar os IPs das conexões detectadas

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/metrics", (req, res) => {
  res.json({
    activeConnections,
    totalRequests,
    attackLogs
  });
});

io.on("connection", (socket) => {
  console.log("A honeypot connected.");
  activeConnections++;
  updateDashboard();

  socket.on("honeypotData", (data) => {
    console.log("Data received from honeypot:", data);
    totalRequests++;

    // Armazenar logs das conexões detectadas
    attackLogs.push({
      ip: data.clientAddress,
      port: data.attackerPort,
      timestamp: new Date().toISOString(),
      message: data.message
    });

    updateDashboard();

    failoverServers.forEach((failoverUrl) => {
      sendToFailover(failoverUrl, data);
    });
  });

  socket.on("disconnect", () => {
    console.log("A honeypot disconnected.");
    activeConnections--;
    updateDashboard();
  });

  function updateDashboard() {
    io.emit("monitorUpdate", {
      message: `Connections: ${activeConnections}, Total Requests: ${totalRequests}`,
      activeConnections,
      totalRequests,
      attackLogs
    });
  }

  function sendToFailover(failoverUrl, data) {
    const failoverSocket = ioClient(failoverUrl);
    failoverSocket.emit("honeypotData", data);
    failoverSocket.close();
  }
});

server.listen(3012, () => {
  console.log("Primary monitoring server is running on http://localhost:3012");
  failoverServers.forEach((failoverUrl, index) => {
    console.log(`Failover server ${index + 1} running at ${failoverUrl}`);
  });
});

// Atualização periódica do painel a cada 5 segundos
setInterval(() => {
  io.emit("monitorUpdate", {
    message: "...",
    activeConnections,
    totalRequests,
    attackLogs
  });
}, 5000);
