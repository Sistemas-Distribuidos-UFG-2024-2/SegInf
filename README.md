📡 Honeypot Distributed Monitoring System

👥 Integrantes

🔹 Desenvolvedores:

Samuel Santos Machado

Matheus Pamplona Oliveira

🚀 Visão Geral
Este projeto implementa um sistema distribuído de honeypot, focado em capturar e monitorar ataques em tempo real. Ele utiliza um balanceador de carga NGINX e componentes de servidores distribuídos, garantindo resiliência e alta disponibilidade no monitoramento das conexões maliciosas.

O sistema é projetado para detectar e registrar ataques, bloquear IPs e fornecer métricas em um painel visual em tempo real.

📜 Objetivo do Projeto
Detectar conexões maliciosas e ataques em múltiplos honeypots distribuídos.
Garantir alta disponibilidade e resiliência por meio do balanceamento de carga NGINX e servidores de failover.
Armazenar logs das conexões detectadas e disponibilizá-los em tempo real no painel de monitoramento.

🛠️ Tecnologias Utilizadas
Node.js e Express: Para o desenvolvimento dos servidores honeypot e monitoramento.
Socket.IO: Comunicação em tempo real entre os componentes do sistema.
NGINX: Balanceador de carga externo responsável pela distribuição das requisições.
Frontend Dashboard: Interface visual para exibir métricas e logs das conexões detectadas.

🔍 Componentes Principais
1. Honeypot
Captura as conexões maliciosas e envia os dados para o servidor central.
Armazena IPs, portas e logs das conexões detectadas.
2. Servidor de Monitoramento
Centraliza e processa os dados enviados pelos honeypots.
Envia as métricas e logs em tempo real para o frontend e os servidores de failover.
3. NGINX Load Balancer
Distribui automaticamente as conexões entre os honeypots e os servidores de monitoramento.
Garante alta disponibilidade e performance do sistema.
4. Dashboard (Frontend)
Interface visual que apresenta as métricas em tempo real, como conexões ativas, requisições totais e logs dos ataques detectados.

📦 Estrutura do Projeto

/
├── honeypot_server.js         # Honeypot responsável por capturar conexões.

├── monitor_server.js          # Servidor central de monitoramento.

├── dashboard.html             # Interface visual do painel.

├── config/                    # Configurações e arquivos de ambiente.

├── nginx.conf                 # Configuração do balanceador NGINX.

├── README.md                  # Documentação do projeto.

├── ddos_simulator.py          # Nosso atacantes  do servidor.

└── package.json               # Dependências e scripts do projeto.
