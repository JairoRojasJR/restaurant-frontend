import { useState } from 'react'
import { toast } from 'sonner'
import { switchShopStatus } from '@/services/company.service'
import { getErrorMessage } from '@/utils'
import type { ShopStatus } from '@/types/server'

interface UseShopStatus {
  shopstatus: ShopStatus
  switchStatus: () => Promise<void>
}

export const useShopStatus = (initializator: UseShopStatus['shopstatus']): UseShopStatus => {
  const [status, setStatus] = useState<UseShopStatus['shopstatus']>(initializator)

  const switchStatus = async (): Promise<void> => {
    try {
      const data = await switchShopStatus(status)
      setStatus(data.status.is)
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  return { shopstatus: status, switchStatus }
}
