import { useState } from 'react'
import { toast } from 'sonner'
import { addPlate, deletePlate, updatePlate } from '@/services/plate.service'
import { toastErrorWhenSendingData } from '@/utils'
import type { Plate } from '@/types/server'
import type { SubmitAsync, MouseModifyPlate, FormModifyPlate } from '@/types/local'

type Plates = Plate[]
interface UsePlates {
  plates: Plates
  submitPlate: SubmitAsync
  updatePlateFromInventory: FormModifyPlate
  deletePlateFromInventory: MouseModifyPlate
}

type CrudeElementsPlate = Omit<ElementsPlate, '_id' | '__v'>
type MappingKeysOnModifyPlate = CrudeElementsPlate & Pick<ElementsPlate, '_id'>

type ElementsPlate = {
  [K in keyof Plate]: string
}

export const usePlates = (initializator: UsePlates['plates']): UsePlates => {
  const [plates, setPlates] = useState<Plates>(initializator)

  const crudeElements: CrudeElementsPlate = {
    name: 'Nombre del plato',
    image: 'Imagen del plato',
    order: 'Tipo de orden'
  }

  const elementsOnModifyPlate: MappingKeysOnModifyPlate = {
    _id: 'id',
    ...crudeElements
  }

  const submitPlate: UsePlates['submitPlate'] = async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const plateAdded = await addPlate(formData)
      setPlates(current => [...current, plateAdded])
      toast(`Plato [${plateAdded.name}] agregado al inventario exitosamente`)
    } catch (error) {
      toastErrorWhenSendingData(error, crudeElements)
    }
  }

  const updatePlateFromInventory: UsePlates['updatePlateFromInventory'] = async (
    e,
    { _id, name }
  ) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const updatedPlate = await updatePlate(_id, formData)
      const updateds = plates.map(current => {
        return current._id === updatedPlate._id ? updatedPlate : current
      })

      setPlates(updateds)
      toast(`Plato [${name}] actualizado del inventario exitosamente`)
    } catch (error) {
      toastErrorWhenSendingData(error, elementsOnModifyPlate)
    }
  }

  const deletePlateFromInventory: UsePlates['deletePlateFromInventory'] = async (e, { _id }) => {
    e.stopPropagation()
    try {
      const deletedPlate = await deletePlate(_id)
      setPlates(plate => plate.filter(current => current._id !== _id))
      toast(`[Plato: ${deletedPlate.name}] eliminado del inventario exitosamente`)
    } catch (error) {
      toastErrorWhenSendingData(error, elementsOnModifyPlate)
    }
  }

  return { plates, submitPlate, updatePlateFromInventory, deletePlateFromInventory }
}
