// Importando os pacotes
const moviesRepository = require('../repositories/moviesRepository');



const createMovie = async (payload)=>{
    try{
        const {title, year, director, genre, duration} = payload;
        let titleMovie = await moviesRepository.findMovie(title)
        
        if(titleMovie){
            return{
                statusCode: 406,
                data: 'Usuário já cadastrado!'
            }
        }


        let movie = await moviesRepository.createMovie(payload);


        if(movie){
            return{
                statusCode: 200,
                data: "Filme registrado com sucesso!"
            }
        } else {
            return{
                statusCode: 400,
                data: 'Não foi possivel registrar o filme'
            }
        }
        


    }
    catch(error){
        return{
            statusCode: 500,
            data: error
        }
    }

}

const getMovie = async()=>{

    try{
        let movie = await moviesRepository.setMovie();
        return {
            statusCode: 200,
            data: movie
        }

    }catch(error){
        return{
            statusCode: 500,
            data: message.error
        }

    }
}

const deleteMovie = async(title) =>{
    
   try{
    const movie = await moviesRepository.deleteMovie(title);
    return {
        statusCode: 200,
        data: "Usuário deletado com sucesso"
    }

   } catch(error){
    return{
        statusCode: 500,
        data: "Erro ao deletar o usuário"
    }

}
}

const updateMovie = async(title,payload) =>{
    try{

        const response = await moviesRepository.updateMovie(title, payload);

        return {
            statusCode: 200,
            data: 'Os dados do usuário foram alterados!'
        }


    }catch(error){
        return{
            statusCode: 500,
            data: "Erro ao deletar o usuário"
        }

    }
}

module.exports = {
    createMovie, getMovie, deleteMovie, updateMovie
}