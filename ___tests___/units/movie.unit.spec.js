//---- Colinha ----

// Testes unitários que devem, ser feitos
// Get Movie
// 1) Erro na verificação do filme x
// 2) Verificação do filme x

// Create Movie

// 1) Verificar se o filme foi cadastrado x
// 2) Registro do filme x

// Delete Movie

// 1) Verificar se o filme está cadastrado x
// 2) Deletar o filme x

// Update Movie

// 1) Revisar as informações do filme x
// 2) Alteração dos dados x
//
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
  test('Visualização dos filmes cadastrados no banco de dados', async () => {

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

  test('Erro na visualização dos filmes cadastrados no banco de dados', async () => {

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
    expect(response.data).toBe('Não foi possivel verificar os filmes!');


  });

  test.skip('Registro de um filme no banco de dados', async()=>{
    let data = {
      title: "Josué revolução",
      year: "2010",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }
      
//Monkando

      mockingoose(movieModel).toReturn(null ,'findOne')
      



      const response = await movieService.createMovie(data);


      expect(response.statusCode).toBe(200);


  });

  test('Erro no registro de um filme no banco de dados', async()=>{
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
      expect(response.data).toBe('Filme já cadastrado!');

  });

  

  test('Tentar deletar o filme e não existir', async()=>{
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
      expect(response.data).toBe('O filme não existe!');
  })

  test('Deletar o filme', async()=>{
    let data = {
      _id: "62c72c23b20f47aefdd5612f",
      title: "Josué revolução",
      duration: "2h:39min",
      director: "Sessão da tarde",
      genre: "Romance - Adolescente"
    }

      // Monckando 

      mockingoose(movieModel).toReturn(data,'findOne');

      const response = await movieService.deleteMovie(data.title);



      expect(response.statusCode).toBe(200)

  });

  test('Alterar dados de um filme', async ()=>{
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

      expect(response.statusCode).toBe(200);
      expect(response.data).toBe('Os dados do filme foram alterados!');
  })

  test('Falta de informação na alteração de um filme', async ()=>{
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

      expect(response.statusCode).toBe(400);
      expect(response.data).toBe('Revise as informações dos filmes!');
  })

});