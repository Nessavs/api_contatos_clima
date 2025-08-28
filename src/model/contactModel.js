import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  endereco: {
    rua: { type: String, trim: true },
    numero: { type: String, trim: true },
    bairro: { type: String, trim: true },
    cidade: { type: String, trim: true },
    estado: { type: String, trim: true },
    cep: { type: String, trim: true }
  },
  telefone: {
    type: [String],
    required: true,
    validate: {
      validator: function (telefones) {
        return new Set(telefones).size === telefones.length
      },
      message: 'Não são permitidos números de telefone duplicados.'
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true })

ContactSchema.pre('find', function () {
  this.where({ deletedAt: null })
})
ContactSchema.pre('findOne', function () {
  this.where({ deletedAt: null })
})

export default mongoose.model('Contact', ContactSchema)
