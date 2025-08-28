import { expect } from 'chai'
import sinon from 'sinon'
import { init } from '../../src/server.js'
import Contact from '../../src/model/contactModel.js'
import weatherUtils from '../../src/utils/weatherUtils.js'

describe('API de Contatos - Testes de Integração', () => {
  let server
  let contactId

  before(async () => {
    server = await init()
    await Contact.deleteMany({})
  })

  after(async () => {
    await server.stop()
  })

  describe('POST /contatos', () => {
    it('deve criar um novo contato com sucesso', async () => {
      const payload = {
        nome: "Usuario de Teste de Integração",
        telefone: ["11987654321"],
        endereco: {
          cidade: "São Paulo"
        }
      }
      const res = await server.inject({
        method: 'POST',
        url: '/contatos',
        payload
      })
      expect(res.statusCode).to.equal(201)
      contactId = res.result._id.toString()
    })
  })

  describe('GET /contatos/{id}', () => {
    let getWeatherStub

    beforeEach(() => {
      getWeatherStub = sinon.stub(weatherUtils, 'getWeather') 
    })

    afterEach(() => {
      getWeatherStub.restore()
    })

    it('deve retornar o contato com os dados do clima', async () => {
        getWeatherStub.resolves({ temperatura: '25°C', sugestao: '...' })
        const res = await server.inject({ method: 'GET', url: `/contatos/${contactId}` })
        expect(res.statusCode).to.equal(200)
        expect(res.result.clima.temperatura).to.equal('25°C')
    })
  })
})