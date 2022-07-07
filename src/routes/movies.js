//Importando os pacotes
const express = require('express');
const routesUsers = express.Router();


// importando o controller
const movieController = require('../controller/movieController');


routesUsers.post('', movieController.createMovie);





module.exports = routesUsers;