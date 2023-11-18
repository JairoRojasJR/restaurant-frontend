import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { addMenu, deleteMenu, getMenu, updateMenu } from '@/services/menu.service'
import { getPlate } from '@/services/plate.service'
import { getErrorMessage, toastErrorWhenSendingData } from '@/utils'
import type { Menu, Plate } from '@/types/server'
import { type ModifyMenu } from '@/types/local'

type PlatesInMenu = Menu[]
interface UseMenu {
  menu: PlatesInMenu
  submitMenu: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  switchStatusMenu: ModifyMenu
  deletePlateFromMenu: ModifyMenu
}

type MappingKeysOnSubmitMenu = Pick<ElementsMenu, 'plate'> & Pick<ElementsPlate, 'name'>
type MappingKeysOnModifyMenu = Pick<ElementsMenu, '_id' | 'status'>
type ElementsPlate = {
  [T in keyof Plate]: string
}

type ElementsMenu = {
  [T in keyof Menu]: string
}

export const useMenu = (): UseMenu => {
  const [menu, setMenu] = useState<PlatesInMenu>([])

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

      formData.set('plate', plateQuery._id)
      const plateAdded = await addMenu(formData)

      setMenu(menu => [...menu, plateAdded])
      toast(`Plato [${plateAdded.plate.name}] agregado al menú exitosamente`)
    } catch (error) {
      const menu: MappingKeysOnSubmitMenu = { plate: 'Nombre del plato', name: 'Nombre del plato' }
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

  const deletePlateFromMenu: UseMenu['deletePlateFromMenu'] = async (e, { _id }) => {
    e.stopPropagation()
    try {
      await deleteMenu(_id)
      setMenu(menu => menu.filter(current => current._id !== _id))
    } catch (error) {
      toastErrorWhenSendingData(error, elementsOnModifyMenu)
    }
  }

  useEffect(() => {
    getMenu()
      .then(data => {
        setMenu(data)
      })
      .catch(e => {
        toast(getErrorMessage(e))
      })
  }, [])

  return { menu, submitMenu, switchStatusMenu, deletePlateFromMenu }
}
