import * as ContactService from '../services/contactServices.js'

export async function create(request, h) {
  const newContact = await ContactService.createContact(request.payload)
  return h.response(newContact).code(201)
}

export async function list(request, h) {
  const contacts = await ContactService.listContacts(request.query)
  return h.response(contacts).code(200)
}

export async function get(request, h) {
  const contact = await ContactService.getContactById(request.params.id)
  return h.response(contact).code(200)
}

export async function update(request, h) {
  const updatedContact = await ContactService.updateContact(request.params.id, request.payload)
  return h.response(updatedContact).code(200)
}

export async function remove(request, h) {
  const result = await ContactService.deleteContact(request.params.id)
  return h.response(result).code(200)
}
