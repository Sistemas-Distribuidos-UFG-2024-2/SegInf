import socket
import json
import sqlite3

# Configuração do banco de dados SQLite
def setup_database():
    conn = sqlite3.connect('dados.sql')  # Alterado para salvar como .sql
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL
    )
    ''')
    conn.commit()
    return conn

def save_data_to_db(conn, data):
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (nome, idade) VALUES (?, ?)", (data['nome'], data['idade']))
    conn.commit()

def start_server():
    conn = setup_database()
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 65432))
    server_socket.listen()

    print("Servidor em execução e aguardando conexões...")

    while True:
        client_socket, address = server_socket.accept()
        print(f"Conexão estabelecida com {address}")
        
        data = client_socket.recv(1024).decode()
        data = json.loads(data)  # Desserialização JSON
        
        # Salvando dados no banco de dados
        save_data_to_db(conn, data)
        print(f"Dados recebidos e salvos: {data}")
        
        client_socket.sendall("Dados salvos com sucesso!".encode())
        client_socket.close()

if __name__ == "__main__":
    start_server()
