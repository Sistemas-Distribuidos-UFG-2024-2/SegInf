#instalacao de bilbiotecas
#pip install requests beautifulsoup4

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time

#coletar os links da pagina
def get_links(url):
    try:
        response = requests.get(url)  
        response.raise_for_status()  
        # analisa o HTML
        soup = BeautifulSoup(response.text, 'html.parser')  

        #armazenar os links 
        links = set()  
        for link in soup.find_all('a', href=True):  
            full_url = urljoin(url, link['href'])  
            links.add(full_url)  

        return links  

    # handling de erro com conjunto vazio
    except requests.RequestException as e:
        print(f"Erro ao acessar {url}: {e}")
        return set()  

#paginas visitadas e a visitar
def simple_crawler(start_url, max_pages=10):
    visited = set()  
    to_visit = [start_url]  

    while to_visit and len(visited) < max_pages:
        current_url = to_visit.pop(0)  

        if current_url in visited:
            continue  

        print(f"Visitando: {current_url}")
        visited.add(current_url)  

        links = get_links(current_url)
        to_visit.extend(link for link in links if link not in visited)

        time.sleep(1)

    print("\nPáginas visitadas:")
    for url in visited:
        print(url)

start_url = "https://exemplo.com.br"
simple_crawler(start_url, max_pages=5)
