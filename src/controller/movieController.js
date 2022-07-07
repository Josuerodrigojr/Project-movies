// Importando os pacotes
const movieService = require('../services/movieService')

const createMovie = async (req, res) => {
    const movie = req.body;

    const response = await movieService.createMovie(movie)
    console.log('Response ->', response)
    return res.status(response.statusCode).json(response.data);
  }

  module.exports = {
    createMovie
  }