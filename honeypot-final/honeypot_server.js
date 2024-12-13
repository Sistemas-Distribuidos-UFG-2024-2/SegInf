const net = require("net");
const io = require("socket.io-client");

// Conexão com o servidor de monitoramento
const monitoringServer = io("http://localhost:3012");

let totalRequests = 0;
let activeConnections = 0;

// Configuração do servidor honeypot
const honeypotServer = net.createServer((socket) => {
  const clientAddress = socket.remoteAddress;
  const attackerPort = socket.remotePort; // Porta do cliente
  const attackTimestamp = new Date().toISOString(); // Data e hora do ataque

  console.log(
    `New connection from ${clientAddress}:${attackerPort} at ${attackTimestamp}`
  );

  // Atualiza o número de conexões ativas e o total de requisições
  activeConnections++;
  totalRequests++;

  // Emite os dados de conexão para o servidor de monitoramento
  monitoringServer.emit("honeypotData", {
    message: `New connection from ${clientAddress}:${attackerPort} at ${attackTimestamp}`,
    activeConnections,
    totalRequests
  });

  socket.on("data", (data) => {
    console.log(`Received data from ${clientAddress}:${attackerPort}: ${data}`);

    // Emite os dados recebidos para o servidor de monitoramento
    monitoringServer.emit("honeypotData", {
      message: `Data from ${clientAddress}:${attackerPort}: ${data}`,
      activeConnections,
      totalRequests
    });
  });

  socket.on("end", () => {
    activeConnections--;
    console.log(`Connection closed: ${clientAddress}:${attackerPort}`);

    // Emite o fechamento da conexão para o servidor de monitoramento
    monitoringServer.emit("honeypotData", {
      message: `Connection closed: ${clientAddress}:${attackerPort}`,
      activeConnections,
      totalRequests
    });
  });

  socket.on("error", (err) => {
    console.error(`Error with ${clientAddress}:${attackerPort}: ${err.message}`);
  });
});

// Porta e IP para o honeypot
const HONEYPOT_PORT = 8081;
honeypotServer.listen(HONEYPOT_PORT, () => {
  console.log(`Honeypot server running on port ${HONEYPOT_PORT}`);
});
