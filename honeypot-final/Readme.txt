Realizar as dependencias:

cd /workspaces/SegInf/honeypot-final
npm install express socket.io
npm install
npm install socket.io-client

node honeypot_server.js
node monitor_server.js
python ddos_simulator.py

Tem algumas informações pro ataque dar certo, verificar qual o ip
que o servidor esta localizado e para o monitoramento precisa verificar
qual https:// esta gerando e modificar no monitor e dashboard.