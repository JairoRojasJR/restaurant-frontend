import { Schema, model, models } from 'mongoose'
import { connectDB } from '../utils/dbconnect'
import type { PlateSchema } from '@/types/types'

await connectDB()

const schema = new Schema<PlateSchema>({
  name: {
    type: String,
    required: [true, 'El nombre es requerida']
  },
  image: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  order: {
    type: String,
    required: [true, 'Tipo de orden requerida']
  }
})

export default models.Plate ?? model('Plate', schema)
