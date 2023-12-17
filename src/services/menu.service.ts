import axios from 'axios'
import { insertIdInUrl } from '@/utils'
import { menuPath } from '@/consts'
import { type Menu } from '@/types/server'

export const getMenu = async (): Promise<Menu[]> => {
  const req = await axios.get(menuPath)
  return (await req.data) as Menu[]
}

export const addMenu = async (formData: FormData): Promise<Menu> => {
  const req = await axios.post(menuPath, formData, { withCredentials: true })
  return (await req.data) as Menu
}

export const updateMenu = async (_id: string, menu: Partial<Menu>): Promise<Menu> => {
  const url = insertIdInUrl(_id, menuPath)
  const req = await axios.put(url, menu, { withCredentials: true })
  return (await req.data) as Menu
}

export const deleteMenu = async (_id: string): Promise<Menu> => {
  const url = insertIdInUrl(_id, menuPath)
  const req = await axios.delete(url, { withCredentials: true })
  return (await req.data) as Menu
}
