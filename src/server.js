//Importando os pacotes

// Express -> Responsavel pelas rotas
const express = require('express');

// Mongoose -> Respónsavel pela conecção como banco de dados
const mongoose = require('mongoose');

//Require-Dir -> Responsável por puxar váriaveis de um arquivo
const requireDir = require('require-dir')

// Definindo a rota do express por app
const app = express();

// Determinando o uso do do app com o JSON

app.use(express.json());

//Conectando o banco de dados, depiois criando abaixo a linha para que não tenha quebra da URL e também de topologia.

mongoose.connect(
    'mongodb+srv://movies:movies18@cluster0.c7rav.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  // Juntando tudo que eu tenho na pasta models
  requireDir('../src/models')



  // Consultando a rota

  app.use('/movie', require ('./routes/movies'))



// Definindo a porta que será executado

console.log("Funcionando na porta 3001")
app.listen(3001)
