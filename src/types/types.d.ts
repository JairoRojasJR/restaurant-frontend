import type { Document } from 'mongoose'

export interface Plate {
  name: string
  image: string
  order: 'Entrante' | 'Segundo'
}

export type PlateSchema = Plate & Document
