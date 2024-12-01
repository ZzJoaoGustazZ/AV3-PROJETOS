const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 53494;  // Porta padrão usada pelo Railway para MySQL

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

// Configurações do banco de dados para o novo banco (Railway)
const dbConfig = {
  host: 'mysql-jww1.railway.internal',  // Host do banco
  user: 'root',  // Usuário do banco
  password: 'XfZUPIHFkatAoUdOXgWWwFPLHkSnACjl',  // Senha do banco
  database: 'railway',  // Nome do banco de dados
  port: 3306,  // Porta do banco
};

// Criação da conexão com o banco de dados
const connection = mysql.createConnection(dbConfig); // SINGLETON PATTERN

// Testa a conexão ao iniciar o servidor
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Endpoints do Microsserviço de Estoque
function executeQuery(query, params = []) { // TEMPLATE METHOD
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error('Erro ao executar query:', err);
        reject('Erro ao consultar o banco de dados');
        return;
      }
      resolve(results);
    });
  });
}

// 1. Listar todos os produtos (GET /produtos)
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await executeQuery('SELECT * FROM produtos');
    res.json(produtos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 2. Obter detalhes de um produto (GET /produtos/:id)
app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await executeQuery('SELECT * FROM produtos WHERE id = ?', [id]);
    if (produto.length === 0) {
      res.status(404).send('Produto não encontrado');
      return;
    }
    res.json(produto[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 3. Adicionar um novo produto (POST /produtos)
app.post('/produtos', async (req, res) => {
  const { nome, descricao, quantidade, preco } = req.body;

  try {
    const result = await executeQuery(
      'INSERT INTO produtos (nome, descricao, quantidade, preco) VALUES (?, ?, ?, ?)',
      [nome, descricao, quantidade, preco]
    );

    res.status(201).send({
      id: result.insertId,
      message: 'Produto adicionado com sucesso!',
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// 4. Atualizar um produto (PUT /produtos/:id)
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, quantidade, preco } = req.body;

  try {
    const result = await executeQuery(
      'UPDATE produtos SET nome = ?, descricao = ?, quantidade = ?, preco = ? WHERE id = ?',
      [nome, descricao, quantidade, preco, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).send('Produto não encontrado');
      return;
    }

    res.send({ message: 'Produto atualizado com sucesso!' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// 5. Remover um produto (DELETE /produtos/:id)
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeQuery('DELETE FROM produtos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      res.status(404).send('Produto não encontrado');
      return;
    }

    res.send({ message: 'Produto removido com sucesso!' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Inicia o servidor
app.listen(port, () => {
});
