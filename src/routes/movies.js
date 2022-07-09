//Importando os pacotes
const express = require('express');
const routesUsers = express.Router();


// importando o controller
const movieController = require('../controller/movieController');

routesUsers.get('', movieController.viewMovie);
routesUsers.post('', movieController.createMovie);
routesUsers.delete('/:title', movieController.deleteMovie)
routesUsers.put('/:id', movieController.updateMovie)





module.exports = routesUsers;