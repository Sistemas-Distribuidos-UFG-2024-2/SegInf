import socket
import json

def collect_user_data():
    nome = input("Digite seu nome: ")
    idade = int(input("Digite sua idade: "))
    return {"nome": nome, "idade": idade}

# Configuração do cliente para enviar dados ao servidor
def send_data_to_server(data):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(('localhost', 65432))
    
    # Serializando dados para JSON
    data = json.dumps(data)
    client_socket.sendall(data.encode())
    
    response = client_socket.recv(1024).decode()
    print("Resposta do servidor:", response)
    
    client_socket.close()

if __name__ == "__main__":
    user_data = collect_user_data()
    send_data_to_server(user_data)
