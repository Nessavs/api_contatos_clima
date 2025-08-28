import Joi from 'joi'

const createContactSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  endereco: Joi.object({
    rua: Joi.string(),
    numero: Joi.string(),
    bairro: Joi.string(),
    cidade: Joi.string(),
    estado: Joi.string().length(2),
    cep: Joi.string().pattern(/^[0-9]{5}-?[0-9]{3}$/)
  }).optional(),
  telefone: Joi.array().items(Joi.string()).min(1).unique().required(),
  email: Joi.string().email().optional()
})

const updateContactSchema = Joi.object({
  nome: Joi.string().min(3),
  endereco: Joi.object({
    rua: Joi.string(),
    numero: Joi.string(),
    bairro: Joi.string(),
    cidade: Joi.string(),
    estado: Joi.string().length(2),
    cep: Joi.string().pattern(/^[0-9]{5}-?[0-9]{3}$/)
  }),
  telefone: Joi.array().items(Joi.string()).min(1).unique(),
  email: Joi.string().email()
})

const contactParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
})

const listContactsQuerySchema = Joi.object({
  nome: Joi.string(),
  'endereco.cidade': Joi.string(),
  'endereco.estado': Joi.string(),
  email: Joi.string(),
  telefone: Joi.string()
}).unknown(true)

export {
  createContactSchema,
  updateContactSchema,
  contactParamsSchema,
  listContactsQuerySchema
}
