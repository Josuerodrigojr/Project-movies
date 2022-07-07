// Importando os pacotes
const movies = require('../models/moviesModel');


const createMovie = async(movie)=>{
    return await movies.create(movie);
}

const findMovie = async(title)=>{
    return await movies.findOne({title:title})
}

const setMovie = async()=>{
    return await movies.find({})
}

const deleteMovie = async(title)=>{
    const response = await movies.findOneAndDelete({title:title});

    return response
}

const updateMovie = async(title, payload)=>{
    console.log('titulo e corpo',title, payload)
    const response = await movies.findOneAndUpdate({title:title}, payload) 
    console.log('Response ->>>', response)

    return response

}

module.exports = {
    createMovie, findMovie, setMovie, deleteMovie, updateMovie
}