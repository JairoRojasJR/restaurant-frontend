import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getShopStatus, switchShopStatus } from '@/services/company.service'
import { getErrorMessage } from '@/utils'
import type { ShopStatus } from '@/types/server'

interface UseShopStatus {
  shopstatus: ShopStatus | ''
  switchStatus: () => Promise<void>
}

export const useShopStatus = (): UseShopStatus => {
  const [status, setStatus] = useState<UseShopStatus['shopstatus']>('')

  const switchStatus = async (): Promise<void> => {
    try {
      const data = await switchShopStatus(status)
      setStatus(data.status.is)
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  useEffect(() => {
    getShopStatus()
      .then(data => {
        setStatus(data.is)
      })
      .catch(e => {
        toast(getErrorMessage(e))
      })
  }, [])

  return { shopstatus: status, switchStatus }
}
