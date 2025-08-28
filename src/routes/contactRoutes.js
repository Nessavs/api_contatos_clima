import * as ContactHandler from '../controllers/contactController.js'
import { createContactSchema, updateContactSchema, contactParamsSchema, listContactsQuerySchema } from '../schemas/contactSchema.js'

const contactRoutes = [
  {
    method: 'POST',
    path: '/contatos',
    handler: ContactHandler.create,
    options: {
      description: 'Cria um novo contato',
      tags: ['api', 'contatos'],
      validate: {
        payload: createContactSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/contatos',
    handler: ContactHandler.list,
    options: {
      description: 'Lista todos os contatos com filtros opcionais',
      tags: ['api', 'contatos'],
      validate: {
        query: listContactsQuerySchema
      }
    }
  },
  {
    method: 'GET',
    path: '/contatos/{id}',
    handler: ContactHandler.get,
    options: {
      description: 'Busca um contato por ID e retorna informações do clima',
      tags: ['api', 'contatos'],
      validate: {
        params: contactParamsSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/contatos/{id}',
    handler: ContactHandler.update,
    options: {
      description: 'Atualiza um contato por ID',
      tags: ['api', 'contatos'],
      validate: {
        params: contactParamsSchema,
        payload: updateContactSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/contatos/{id}',
    handler: ContactHandler.remove,
    options: {
      description: 'Remove um contato por ID (exclusão lógica)',
      tags: ['api', 'contatos'],
      validate: {
        params: contactParamsSchema
      }
    }
  }
]

export default contactRoutes
