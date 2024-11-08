1-Para criar o honeypot e necessario instalar o Ratchet via Composer
composer require cboden/ratchet

2-Para rodar o servidor , use o comando
php honeypot-server.php

3-Para executar o monitor central , crie um projeto Node.js e instale as seguintes dependencias
npm init -y
npm install express socket.io

4-Executar os Componentes
Servidor Honeypot: Execute o servidor WebSocket em PHP.
php honeypot-server.php

Servidor de Monitoramento: Execute o monitor em Node.js.
node monitor-server.js

Cliente de Testes: Rode o cliente de testes em Python para simular ataques.
python ddos-client.py

-----------------------------------------------------------------------------

Para rodar o codigo no codespaces:

1 Verifique se o Composer está instalado no ambiente do Codespaces com
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

instale as dependências do Ratchet
cd honeypot-server
composer require cboden/ratchet


2 Instale as dependências do servidor de monitoramento em Node.js.
Navegue até a pasta do monitor e instale os pacotes Node.js
cd ../monitor
npm install

3 Instale as dependências do cliente de testes em Python
cd ../test-client
pip install -r requirements.txt

4 Configuração de Serviços com Docker
docker-compose up -d

5 Executar Cada Componente
Servidor Honeypot
php honeypot-server.php

Servidor de Monitoramento
node monitor-server.js

Cliente de Testes
python ddos-client.py

6 Abra o monitor de logs em seu navegador no endereço gerado pelo Codespaces, em http://localhost:3000 ou em um URL designado pelo Codespaces, 
para visualizar as tentativas de ataque e informações capturadas
