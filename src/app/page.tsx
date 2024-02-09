import { HomePage } from '@/components/HomePage'
import { getMenu } from '@/services/menu.service'
import { getPlate } from '@/services/plate.service'
import { getShopStatus } from '@/services/company.service'

export default async function Home(): Promise<JSX.Element> {
  const plates = await getPlate()
  const menu = await getMenu()
  const shopStatus = await getShopStatus()

  if (!Array.isArray(plates)) {
    throw new Error('[ERROR INTERNO: getPlate] tipo de dato inesperado')
  }

  return <HomePage shopStatus={shopStatus.is} menu={menu} plates={plates} />
}
