import axios from 'axios'

function getSuggestion(temp, condition) {
  if (temp <= 18) {
    return 'Ofereça um chocolate quente ao seu contato...'
  }
  if (temp >= 30) {
    if (condition.includes('sol')) {
      return 'Convide seu contato para ir à praia com esse calor!'
    }
    if (condition.includes('chuva') || condition.includes('chuviscos')) {
      return 'Convide seu contato para tomar um sorvete'
    }
  }
  if (temp > 18 && temp < 30) {
    if (condition.includes('sol')) {
      return 'Convide seu contato para fazer alguma atividade ao ar livre'
    }
    if (condition.includes('chuva') || condition.includes('chuviscos')) {
      return 'Convide seu contato para ver um filme'
    }
  }
  return 'Que tal marcar um café?'
}

/**
 * Busca a previsão do tempo para uma cidade e retorna os dados formatados.
 * @param {string} cidade - O nome da cidade.
 * @returns {object} - Objeto com os dados do clima e uma sugestão.
 */
export async function getWeather(cidade) {
  const apiKey = process.env.HG_BRASIL_API_KEY 
  const url = `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${cidade}`

  try {
    const response = await axios.get(url)
    const weatherData = response.data.results

    if (!weatherData || weatherData.error || weatherData.from === 'default') {
      throw new Error('Cidade não encontrada ou erro na API de clima.')
    }

    const temp = weatherData.temp
    const condition = weatherData.description.toLowerCase()
    const suggestion = getSuggestion(temp, condition)

    return {
      temperatura: `${temp}°C`,
      condicao: weatherData.description,
      sugestao: suggestion
    }
  } catch (error) {
    console.error('Falha ao buscar dados do clima:', error.message)
    return {
      temperatura: null,
      condicao: null,
      sugestao: 'Não foi possível obter a previsão do tempo para esta cidade.'
    }
  }
}

const weatherUtils = { getWeather }
export default weatherUtils
