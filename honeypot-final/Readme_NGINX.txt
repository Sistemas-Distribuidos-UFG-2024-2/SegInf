Passo a passo para instalar em um Windows:

# Acesse o site oficial do NGINX: https://nginx.org/en/download.html
# Baixe e instale a versão Stable version para Windows (1.26.2)
# Extraia pro diretório C:\nginx

Configurar o NGINX:

# Vá até a pasta que esta instalada no caso C:\nginx
# Dentro dessa pasta, localize o arquivo conf\nginx.conf e edite-o para configurar o balanceamento de carga. O arquivo nginx.conf é onde você configurará os servidores backend e as regras de balanceamento de carga.

worker_processes 1;

events {
    worker_connections 1024;
}

http {
    upstream honeypot_backend {
        # Servidores backend (honeypot) para balanceamento de carga
        server 127.0.0.1:8081;
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
    }

    server {
        listen 8080;  # Porta que o NGINX irá escutar

        location / {
            proxy_pass http://honeypot_backend;  # Encaminha as conexões para o grupo de servidores backend
        }

        access_log logs/honeypot_access.log;
        error_log logs/honeypot_error.log;
    }
}


Para rodar o GINX no Windows:

# Abra o cmd como administrador da máquina
# Abra o diretório da pasta no caso cd C:\nginx
# Com ele aberto, execute start nginx
# Só verificar se no http://localhost:8080 esta rodando e encaminhando para 8081,8082 e 8083.


Obs:
Para parar o balanceador: nginx -s stop
Para reiniciar o balanceador: nginx -s reload
Caso as variáveis de ambiente não execute assista esse vídeo: https://www.youtube.com/watch?v=TAjKUAJra9w




