// Importando os pacotes 

const movieService = require('../../src/services/movieService') 
const mockingoose = require('mockingoose');

const movieModel = require("../../src/models/moviesModel");

// Solictando para o jest para que possamos registrar no banco de dados virtual.

afterEach(() => {
    jest.restoreAllMocks()
  });

  

  describe('Testes unitários de filme', ()=>{
    
    test('Teste para cadastrar o filme no banco de dados', async ()=>{
        
        const data = {
            title: "Lagoa 6",
            year: "2010",
            duration: "1h:39min",
            director: "Sessão da tarde",
            genre: "Romance - Adolescente"   
        }

        //Monkando
        mockingoose(movieModel).toReturn(null, 'findOne');

        // Verificando se o usuário já existe no banco de dados
        const response = await movieService.createMovie(data);
        console.log('Estou no response ->', response)

        expect(response.statusCode).toBe(200);
        expect(response.data).toBe('Filme registrado com sucesso!')


    })

    test('Teste para verificar se o filme existe no banco de dados', async ()=>{
        const data = {
            title: "Lagoa Amarela",
            year: "2010",
            duration: "1h:39min",
            director: "Sessão da tarde",
            genre: "Romance - Adolescente"   
        }

        //Monkando
        mockingoose(movieModel).toReturn(data, 'findOne');

        // Verificando se o usuário já existe no banco de dados
        const response = await movieService.createMovie(data);

        expect(response.statusCode).toBe(406);
        expect(response.data).toBe('Filme já cadastrado!')


    });


  })