import axios from 'axios'
import { companyPath } from '@/consts'
import type { Status, Company, ShopStatus } from '@/types/server'

export const getShopStatus = async (): Promise<Status> => {
  const query: keyof Company = 'status'
  const params = new URLSearchParams()
  params.append('query', query)
  const url = `${companyPath}?${params.toString()}`

  const req = await axios.get(url)
  return (await req.data) as Status
}

export const switchShopStatus = async (status: ShopStatus | ''): Promise<Company> => {
  let newStatus: ShopStatus
  if (status === 'Abierto') newStatus = 'Cerrado'
  else newStatus = 'Abierto'

  const req = await axios.put(companyPath, { status: newStatus })
  return (await req.data) as Company
}
