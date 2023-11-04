import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { addMenu, getMenu, updateMenu } from '@/services/menu.service'
import { getPlate } from '@/services/plate.service'
import { getErrorMessage, toastErrorWhenSendingData } from '@/utils'
import type { Menu, Plate } from '@/types/server'

type PlatesInMenu = Menu[]
interface UseMenu {
  menu: PlatesInMenu
  submitMenu: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  switchStatusMenu: (e: React.MouseEvent<HTMLElement>) => Promise<void>
}

type MappingKeysOnSubmitMenu = Pick<ElementsMenu, 'plate'> & Pick<ElementsPlate, 'name'>
type MappingKeysOnSwitchMenu = Pick<ElementsMenu, '_id' | 'status'>
type ElementsPlate = {
  [T in keyof Plate]: string
}

type ElementsMenu = {
  [T in keyof Menu]: string
}

export const useMenu = (): UseMenu => {
  const [menu, setMenu] = useState<PlatesInMenu>([])

  const submitMenu: UseMenu['submitMenu'] = async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const plateName = formData.get('plate')

    try {
      const params = new URLSearchParams()

      if (plateName === null || typeof plateName !== 'string') {
        throw new Error('[Error en aplicación] no se pudo recuperar el campo [name]')
      }

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

  const switchStatusMenu: UseMenu['switchStatusMenu'] = async e => {
    const _id = e.currentTarget.id
    const targetMenu = menu.find(data => data._id === _id)

    try {
      if (targetMenu === undefined) throw new Error('[id] No se encontró el id del plato')
      const { status } = targetMenu
      const newStatus: Menu['status'] = status === 'Agotado' ? 'Disponible' : 'Agotado'
      const data = await updateMenu(_id, { status: newStatus })
      setMenu(currentMenu =>
        currentMenu.map(plateInMenu => (plateInMenu._id === _id ? data : plateInMenu))
      )
    } catch (error) {
      const elements: MappingKeysOnSwitchMenu = { _id: 'id', status: 'Disponibilidad' }
      toastErrorWhenSendingData(error, elements)
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

  return { menu, submitMenu, switchStatusMenu }
}
