// instanciar a camada de service
const movieService = require('../../src/services/movieService');

// instanciar o mockingoose
const mockingoose = require('mockingoose')

// instanciar a cama de model
const movieModel = require('../../src/models/moviesModel');


// precisamos limpar
jest.setTimeout(30000);
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

  test('Teste para erro no registro de um filme no banco de dados', async()=>{
    let data = {
      title: "Lagoa 590",
      year: "2010",
      duration: "1h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
        
      }
//Monkando

      mockingoose(movieModel).toReturn(null, 'findOne')


      const response = await movieService.createMovie(data);
      console.log("response", response)
      expect(response.statusCode).toBe(406);

  })

});