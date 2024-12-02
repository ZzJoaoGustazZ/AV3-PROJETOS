# AV3-PROJETOS
1) criar banco de dados no mysql 

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);


2) ALTERAR DADOS DO BANCO DE DADOS CONFIG (MINHA PORTA TAVA NO 3300)´

3)  Utilizando GET
    /produtos --- retorna todos os produtos
    /produtos/id --- retorna o produto com base no id

    Utilizando POST
    /produtos      (nome,descricao,quantidade,preco)

            #Utilizando PUT
    /produtos/id   (nome,descricao,quantidade,preco)

            #Utilizando DELETE
    /produtos/id


    colunas = nome, descricao, quantidade, preco
4) ver se tem node no pc



5) aplicar banco de dados

HOSTNAME: junction.proxy.rlwy.net
PORT: 53494
USERNAME: root
PASSWORD: XfZUPIHFkatAoUdOXgWWwFPLHkSnACjl

