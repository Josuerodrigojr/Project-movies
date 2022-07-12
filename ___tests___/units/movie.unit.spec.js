// instanciar a camada de service
const movieService = require('../../src/services/movieService');

// instanciar o mockingoose
const mockingoose = require('mockingoose')

// instanciar a cama de model
const movieModel = require('../../src/models/moviesModel');


// precisamos limpar
jest.setTimeout(3000000);
afterEach(() => {
  jest.restoreAllMocks();
});

/*beforeEach(() => {
});*/

describe('Teste de Unidade do Usuário', () => {
  test('Verificação do filme', async () => {

    // preciso construir o meu objeto de entrada
    let data = {
      title: "Lagoa 590",
      year: "2010",
      duration: "1h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
        
      }

    // Forçando o retorno null para quando realizar o findOne ele não encontrar nada
    // e seguir com o insert de usuário
    mockingoose(movieModel).toReturn(data, 'find');

    const response = await movieService.getMovie();
    expect(response.statusCode).toBe(200);


  });

  test('Erro na verificação do filme', async () => {

    // preciso construir o meu objeto de entrada
    let data = {
      title: "Lagoa 590",
      year: "2010",
      duration: "1h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
        
      }

    // Forçando o retorno null para quando realizar o findOne ele não encontrar nada
    // e seguir com o insert de usuário
    mockingoose(movieModel).toReturn(null, 'find');

    const response = await movieService.getMovie();
    expect(response.statusCode).toBe(404);


  });

  test('Teste para registro de um filme no banco de dados', async()=>{
    let data = {
      _id: "62c72c23b20f47aefdd5612f",
      title: "Josué revolução",
      year: "2010",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }
      
//Monkando

      mockingoose(movieModel).toReturn(null, 'findOne')
      



      const response = await movieService.createMovie(data);
      console.log('RESPONSE', response)

      expect(response.statusCode).toBe(200);

  });

  test('Teste para erro no registro de um filme no banco de dados', async()=>{
    let data = {
      _id: "62c72c23b20f47aefdd5612f",
      title: "Josué revolução",
      year: "2010",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }
      
//Monkando

      mockingoose(movieModel).toReturn(data, 'findOne')


      const response = await movieService.createMovie(data);

      expect(response.statusCode).toBe(406);

  });

  

  test('Teste para tentar deletar o filme e não existir', async()=>{
    let data = {
      title: "Lagoa 5",
      year: "2010",
      duration: "1h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
        
      }

      // Monckando 

      mockingoose(movieModel).toReturn(null,'findOne');

      const response = await movieService.deleteMovie(data.title);

      expect(response.statusCode).toBe(404)
  })

  test('Teste para deletar o filme', async()=>{
    let data = {
      _id: "62c72c23b20f47aefdd5612f",
      title: "Josué revolução",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }

      // Monckando 

      mockingoose(movieModel).toReturn(null,'findOne');

      const response = await movieService.deleteMovie(data.title);



      expect(response.statusCode).toBe(404)
  });

  test('Teste para alterar dados de um filme', async ()=>{
    let data = {
      _id: "62c72c23b20f47aefdd5612f",
      title: "Josué revolução",
      year: "2020",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }
      //Monkando
      mockingoose(movieModel).toReturn(null, 'findByIdAndUpdate')

      const response = await movieService.updateMovie(data._id, data)

      expect(response.statusCode).toBe(200)
  })

  test('Teste para falta de informação no cadastro de um filme', async ()=>{
    let data = {
      _id: "62c72c23b20f47aefdd5612f",
      title: "Josué revolução",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }
      //Monkando
      mockingoose(movieModel).toReturn(null, 'findByIdAndUpdate')

      const response = await movieService.updateMovie(data._id, data)

      expect(response.statusCode).toBe(400)
  })

});