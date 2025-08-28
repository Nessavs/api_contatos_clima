import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import { getWeather } from '../../src/utils/weatherUtils.js'

describe('Utilitário de Clima - Testes Unitários', () => {
  let axiosGetStub

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get')
  })

  afterEach(() => {
    axiosGetStub.restore()
  })

  it('deve retornar a temperatura e a sugestão correta para uma cidade válida', async () => {
    const fakeApiResponse = {
      data: {
        results: {
          temp: 31,
          description: 'Tempo de sol',
          from: 'api'
        }
      }
    };
    axiosGetStub.resolves(fakeApiResponse)

    const result = await getWeather('Salvador')

    expect(result.temperatura).to.equal('31°C')
    expect(result.sugestao).to.equal('Convide seu contato para ir à praia com esse calor!')
  });

  it('deve retornar a mensagem de erro se a API retornar um resultado padrão (from: default)', async () => {
    const fakeApiResponse = {
      data: {
        results: {
          from: 'default'
        }
      }
    }
    axiosGetStub.resolves(fakeApiResponse)

    const result = await getWeather('CidadeInexistente')

    expect(result.sugestao).to.equal('Não foi possível obter a previsão do tempo para esta cidade.')
  })

  it('deve retornar a mensagem de erro se a chamada da API falhar (ex: rede)', async () => {
    axiosGetStub.rejects(new Error('Network Error'))

    const result = await getWeather('QualquerCidade')

    expect(result.sugestao).to.equal('Não foi possível obter a previsão do tempo para esta cidade.')
  })
})