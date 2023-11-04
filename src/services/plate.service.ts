import axios from 'axios'
import { platesPath } from '@/consts'
import { type Plate } from '@/types/server'

export const getPlate = async (params?: URLSearchParams): Promise<Plate> => {
  let url = platesPath
  if (params !== undefined) {
    url = `${url}?${params.toString()}`
  }
  const req = await axios.get(url)
  return (await req.data) as Plate
}

export const addPlate = async (formData: FormData): Promise<Plate> => {
  const req = await axios.post(platesPath, formData)
  return (await req.data) as Plate
}
