import axios from 'axios'
import { platesPath } from '@/consts'
import { type Plate } from '@/types/server'
import { insertIdInUrl } from '@/utils'

export const getPlate = async (params?: URLSearchParams): Promise<Plate | Plate[]> => {
  let url = platesPath
  if (params !== undefined) {
    url = `${url}?${params.toString()}`
  }
  const req = await axios.get(url)
  return (await req.data) as Plate | Plate[]
}

export const addPlate = async (formData: FormData): Promise<Plate> => {
  const req = await axios.post(platesPath, formData)
  return (await req.data) as Plate
}

export const updatePlate = async (_id: string, formData: FormData): Promise<Plate> => {
  const url = insertIdInUrl(_id, platesPath)
  const req = await axios.put(url, formData)
  return (await req.data) as Plate
}

export const deletePlate = async (_id: string): Promise<Plate> => {
  const url = insertIdInUrl(_id, platesPath)
  const req = await axios.delete(url)
  return (await req.data) as Plate
}
