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

module.exports = {
    createMovie
}