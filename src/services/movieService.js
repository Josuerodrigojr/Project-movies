// Importando os pacotes
const moviesRepository = require('../repositories/moviesRepository');



const createMovie = async (payload)=>{
    try{
        const {title} = payload;
        let titleMovie = await moviesRepository.findMovie(title)

        
        if(titleMovie){
            return{
                statusCode: 406,
                data: 'Filme já cadastrado!'
            }
        }

        

        const movie = await moviesRepository.createMovie(payload);
         return{
                statusCode: 200,
                data: movie
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

        if(!movie){
            return{
                statusCode: 404,
                data: 'Não foi possivel verificar os filmes!'
            }
        }

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

    let titleMovie = await moviesRepository.findMovie(title);


    
    if(!titleMovie){
        return{
            statusCode: 404,
            data: 'O filme não existe!'
        }
    }



    await moviesRepository.deleteMovie(title);
    return {
        statusCode: 200,
        data: "Filme deletado com sucesso!"
    }

   } catch(error){
    return{
        statusCode: 500,
        data: "Erro ao deletar o filme"
    }

}
}

const updateMovie = async(id, payload) =>{
    try{
        const {title, year, director, genre, duration} = payload;

        if(!title || !year || !director || !genre || !duration){
            return{
                statusCode: 400,
                data: 'Revise as informações dos filmes!'
            }
        }    

        await moviesRepository.updateMovie(id, payload);

        return {
            statusCode: 200,
            data: 'Os dados do filme foram alterados!'
        }


    }catch(error){
        return{
            statusCode: 500,
            data: "Erro ao deletar o filme"
        }

    }
}

module.exports = {
    createMovie, getMovie, deleteMovie, updateMovie
}