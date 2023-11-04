// Types recicled from Backend
export type PlateOrder = 'Entrante' | 'Segundo'
export type Day = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'
export type ShopStatus = 'Abierto' | 'Cerrado'
export type MenuStatus = 'Disponible' | 'Agotado'

export type BlobPaths = 'plates/'

export interface ResponseMessage {
  message: string
}

export interface ResponseError {
  error: string
}

export interface ResponseSchemaError {
  name: string
  errors: SchemaError[]
}

export interface SchemaError extends ResponseMessage {
  path: string[]
}

export type ResponseMessageOrError = ResponseMessage & ResponseError
// ----------

export interface Status {
  is: ShopStatus
  confirmed: boolean
  comfirmedAt: Date
}

export interface Schedule {
  _id: string
  day: Day
  schedule: string
}

export interface Company {
  _id: string
  name: string
  address: string
  status: Status
  schedules: Schedule[]
  __v: number
}

export interface Plate {
  _id: string
  name: string
  image: string
  order: PlateOrder
  __v: number
}

export interface Menu {
  _id: string
  plate: Plate
  status: MenuStatus
  __v: number
}
