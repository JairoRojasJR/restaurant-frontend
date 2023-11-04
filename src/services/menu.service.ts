import axios from 'axios'
import { menuPath } from '@/consts'
import { type Menu } from '@/types/server'

export const getMenu = async (): Promise<Menu[]> => {
  const req = await axios.get(menuPath)
  return (await req.data) as Menu[]
}

export const addMenu = async (formData: FormData): Promise<Menu> => {
  const req = await axios.post(menuPath, formData)
  return (await req.data) as Menu
}

export const updateMenu = async (_id: string, menu: Partial<Menu>): Promise<Menu> => {
  const params = new URLSearchParams()
  params.append('_id', _id)
  const url = `${menuPath}?${params.toString()}`

  const req = await axios.put(url, menu)
  return (await req.data) as Menu
}
