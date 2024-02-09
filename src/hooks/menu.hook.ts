import { useState } from 'react'
import { toast } from 'sonner'
import { addMenu, deleteMenu, getMenu, updateMenu } from '@/services/menu.service'
import { getPlate } from '@/services/plate.service'
import { getErrorMessage, toastErrorWhenSendingData } from '@/utils'
import type { Menu, Plate } from '@/types/server'
import { type MouseModifyMenu } from '@/types/local'

type PlatesInMenu = Menu[]
interface UseMenu {
  menu: PlatesInMenu
  submitMenu: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  submitMenuBySearchResult: (plateName: string) => Promise<void>
  switchStatusMenu: MouseModifyMenu
  updatePlateFromMenu: (plate: Plate) => void
  deletePlateFromMenu: MouseModifyMenu
}

type MappingKeysOnSubmitMenu = Pick<ElementsMenu, 'plate' | 'status'> & Pick<ElementsPlate, 'name'>
type MappingKeysOnModifyMenu = Pick<ElementsMenu, '_id' | 'status'>
type ElementsPlate = {
  [T in keyof Plate]: string
}

type ElementsMenu = {
  [T in keyof Menu]: string
}

const getPlateByName = async (plateName: string): Promise<Plate> => {
  const params = new URLSearchParams()
  params.set('name', plateName)
  const plateQuery = await getPlate(params)
  if (Array.isArray(plateQuery)) {
    throw new Error('[ERROR INTERNO] tipo de dato inesperado en getPlate')
  }
  return plateQuery
}

export const useMenu = (initializator: UseMenu['menu']): UseMenu => {
  const [menu, setMenu] = useState<PlatesInMenu>(initializator)

  const addPlateQueryToMenu = async (formData: FormData): Promise<void> => {
    const plateAdded = await addMenu(formData)
    setMenu(menu => [...menu, plateAdded])
    toast(`Plato [${plateAdded.plate.name}] agregado al menú exitosamente`)
  }

  const elementsOnModifyMenu: MappingKeysOnModifyMenu = { _id: 'id', status: 'Disponibilidad' }

  const submitMenu: UseMenu['submitMenu'] = async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const plateName = formData.get('plate')

    try {
      if (plateName === null || typeof plateName !== 'string') {
        throw new Error('[Error en aplicación] no se pudo recuperar el campo [name]')
      }

      const params = new URLSearchParams()
      params.set('name', plateName)
      const plateQuery = await getPlate(params)
      if (Array.isArray(plateQuery)) {
        throw new Error('[ERROR INTERNO] tipo de dato inesperado en getPlate')
      }

      formData.set('plate', plateQuery._id)
      const plateAdded = await addMenu(formData)

      setMenu(menu => [...menu, plateAdded])
      toast(`Plato [${plateAdded.plate.name}] agregado al menú exitosamente`)
    } catch (error) {
      const menu: MappingKeysOnSubmitMenu = {
        plate: 'Nombre del plato',
        name: 'Nombre del plato',
        status: 'Disponibilidad'
      }
      toastErrorWhenSendingData(error, menu)
    }
  }
  const submitMenuBySearchResult: UseMenu['submitMenuBySearchResult'] = async plateName => {
    const formData = new FormData()

    try {
      const status: Menu['status'] = 'Disponible'
      const plateQuery = await getPlateByName(plateName)
      formData.set('plate', plateQuery._id)
      formData.set('status', status)
      await addPlateQueryToMenu(formData)
    } catch (error) {
      const menu: MappingKeysOnSubmitMenu = {
        plate: 'Nombre del plato',
        name: 'Nombre del plato',
        status: 'Disponibilidad'
      }
      toastErrorWhenSendingData(error, menu)
    }
  }

  const switchStatusMenu: UseMenu['switchStatusMenu'] = async (e, { _id, status }) => {
    try {
      const newStatus: Menu['status'] = status === 'Agotado' ? 'Disponible' : 'Agotado'
      const data = await updateMenu(_id, { status: newStatus })
      setMenu(currentMenu =>
        currentMenu.map(plateInMenu => (plateInMenu._id === _id ? data : plateInMenu))
      )
    } catch (error) {
      toastErrorWhenSendingData(error, elementsOnModifyMenu)
    }
  }

  const updatePlateFromMenu: UseMenu['updatePlateFromMenu'] = async plate => {
    try {
      const updateds = await getMenu()
      setMenu(updateds)
      toast(`Plato [${plate.name}] actualizado del menú exitosamente`)
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  const deletePlateFromMenu: UseMenu['deletePlateFromMenu'] = async (e, { _id }) => {
    e.stopPropagation()
    try {
      const deletedPlateFromMenu = await deleteMenu(_id)
      setMenu(menu => menu.filter(current => current._id !== _id))
      toast(`[Plato: ${deletedPlateFromMenu.plate.name}] eliminado del menú exitosamente`)
    } catch (error) {
      toastErrorWhenSendingData(error, elementsOnModifyMenu)
    }
  }

  return {
    menu,
    submitMenu,
    submitMenuBySearchResult,
    switchStatusMenu,
    updatePlateFromMenu,
    deletePlateFromMenu
  }
}
