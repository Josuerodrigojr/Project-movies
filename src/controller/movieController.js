// Importando os pacotes
const movieService = require('../services/movieService')

const createMovie = async (req, res) => {
    const movie = req.body;
    const response = await movieService.createMovie(movie)
    return res.status(response.statusCode).json(response.data);
  }

  const viewMovie = async(req,res) =>{
    const movie = req.body
    const response = await movieService.getMovie(movie);
    return res.status(response.statusCode).json(response.data)

  }

  const deleteMovie = async(req,res) =>{
    const title = req.params.title
    const response = await movieService.deleteMovie(title);
    return res.status(response.statusCode).json(response.data)

  }

  const updateMovie = async(req,res)=>{
    const title = req.params.title;
    const payload = req.body;
    const response = movieService.updateMovie(title, payload);
    return res.status(response.statusCode).json(response.data)
  }

  module.exports = {
    createMovie,
    viewMovie,
    deleteMovie,
    updateMovie
  }