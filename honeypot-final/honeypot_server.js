// honeypot_server.js
const net = require('net');
const io = require('socket.io-client');

// Conexão com o servidor de monitoramento
const monitoringServer = io('http://localhost:3012');

let totalRequests = 0;
let activeConnections = 0;
const blockedIps = new Set();

// Configuração do servidor honeypot
const honeypotServer = net.createServer((socket) => {
    const clientAddress = socket.remoteAddress;

    if (blockedIps.has(clientAddress)) {
        console.log(`Blocked connection attempt from ${clientAddress}`);
        socket.end('Your IP is blocked.');
        return;
    }

    activeConnections++;
    totalRequests++;
    console.log(`New connection from ${clientAddress}`);

    monitoringServer.emit('honeypotData', {
        message: `New connection from ${clientAddress}`,
        activeConnections,
        totalRequests,
        blockedIps: blockedIps.size
    });

    socket.on('data', (data) => {
        console.log(`Received data from ${clientAddress}: ${data}`);

        monitoringServer.emit('honeypotData', {
            message: `Data from ${clientAddress}: ${data}`,
            activeConnections,
            totalRequests,
            blockedIps: blockedIps.size
        });
    });

    socket.on('end', () => {
        activeConnections--;
        console.log(`Connection closed: ${clientAddress}`);

        monitoringServer.emit('honeypotData', {
            message: `Connection closed: ${clientAddress}`,
            activeConnections,
            totalRequests,
            blockedIps: blockedIps.size
        });
    });

    socket.on('error', (err) => {
        console.error(`Error with ${clientAddress}: ${err.message}`);
    });
});

// Porta e IP para o honeypot
const HONEYPOT_PORT = 8081;
honeypotServer.listen(HONEYPOT_PORT, () => {
    console.log(`Honeypot server running on port ${HONEYPOT_PORT}`);
});

// Bloquear IPs manualmente para testes (opcional)
setTimeout(() => {
    const testBlockedIp = '127.0.0.1'; // Substituir pelo IP real para testes
    blockedIps.add(testBlockedIp);
    console.log(`Blocked IP: ${testBlockedIp}`);

    monitoringServer.emit('honeypotData', {
        message: `Blocked IP: ${testBlockedIp}`,
        activeConnections,
        totalRequests,
        blockedIps: blockedIps.size
    });
}, 10000);
