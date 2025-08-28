import Contact from '../model/contactModel.js'
import Boom from '@hapi/boom'
import { getWeather } from '../utils/weatherUtils.js'


export async function createContact(contactData) {
  if (contactData.email) {
    const existingContact = await Contact.findOne({ 
      email: contactData.email,
      deletedAt: null 
    })

    if (existingContact) {
      throw Boom.conflict('O endereço de email já está em uso por outro contato.')
    }
  }

  return Contact.create(contactData)
}

export async function listContacts(filters = {}) {
  const query = {}
  
  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key) && typeof filters[key] === 'string') {
      query[key] = { $regex: new RegExp(filters[key], 'i') }
    }
  }
  
  return Contact.find(query).lean()
}

export async function getContactById(id) {
  const contact = await Contact.findOne({ _id: id }).lean()
  if (!contact) {
    throw Boom.notFound('Contato não encontrado.')
  }

  let weatherInfo = {
    sugestao: 'Adicione uma cidade ao contato para ver sugestões baseadas no clima.'
  }

  if (contact.endereco && contact.endereco.cidade) {
    weatherInfo = await getWeather(contact.endereco.cidade)
  }

  return { ...contact, clima: weatherInfo }
}

export async function updateContact(id, updateData) {
  if (updateData.email) {
    const existingContact = await Contact.findOne({
      email: updateData.email,
      _id: { $ne: id },
      deletedAt: null
    })

    if (existingContact) {
      throw Boom.conflict('O endereço de email já está em uso por outro contato.')
    }
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, updateData, { new: true }).lean()
  if (!updatedContact) {
    throw Boom.notFound('Contato não encontrado para atualização.')
  }

  let weatherInfo = {
    sugestao: 'Adicione uma cidade ao contato para ver sugestões baseadas no clima.'
  }

  if (updatedContact.endereco && updatedContact.endereco.cidade) {
    weatherInfo = await getWeather(updatedContact.endereco.cidade)
  }

  return { ...updatedContact, clima: weatherInfo }
}

export async function deleteContact(id) {
  const result = await Contact.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } }
  )

  if (!result) {
    throw Boom.notFound('Contato não encontrado ou já foi removido.')
  }

  return { message: 'Contato removido com sucesso.' }
}
