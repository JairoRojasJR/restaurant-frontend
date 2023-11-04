import { type Dispatch, useState } from 'react'
import { toast } from 'sonner'
import { addPlate } from '@/services/plate.service'
import { toastErrorWhenSendingData } from '@/utils'
import type { Plate } from '@/types/server'

type Plates = Plate[]
interface UsePlates {
  plates: Plates
  setPlates: Dispatch<Plates>
  submitPlate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

type CrudeElements = Omit<Elements, '_id' | '__v'>

type Elements = {
  [K in keyof Plate]: string
}

export const usePlates = (): UsePlates => {
  const [plates, setPlates] = useState<Plates>([])

  const submitPlate: UsePlates['submitPlate'] = async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const plateAdded = await addPlate(formData)
      toast(`Plato [${plateAdded.name}] agregado al inventario exitosamente`)
    } catch (error) {
      const crudeElements: CrudeElements = {
        name: 'Nombre del plato',
        order: 'Tipo de orden',
        image: 'Imagen'
      }

      toastErrorWhenSendingData(error, crudeElements)
    }
  }

  return { plates, setPlates, submitPlate }
}
