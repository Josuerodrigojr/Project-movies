// Importando os pacotes
const movies = require('../models/moviesModel');

const createMovie = async(movie)=>{
    return await movies.create(movie);
}

const findMovie = async(title)=>{
    return await movies.findOne({title:title})
    

}

module.exports = {
    createMovie, findMovie
}