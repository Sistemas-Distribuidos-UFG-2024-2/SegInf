1- apesar do uso de Maven , o Codespaces detecta o pom.xml automaticamente e resolve as dependências.
1- no terminal integrado, execute comandos Maven para compilar e rodar o servidor
	mvn clean install  # Compila e resolve as dependências
	mvn exec:java -Dexec.mainClass="Server"  # Executa a classe principal Server
3-caso o servidor esteja configurado para responder via HTTP, você pode expor uma porta. O GitHub Codespaces permite que você visualize o servidor em execução diretamente no navegador
4-no terminal do codespaces, havera uma opção para expor a porta quando o servidor estiver rodando, e possivel acessá-la via URL.