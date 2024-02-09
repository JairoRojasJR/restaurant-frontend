'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { useAuthContext } from '@/context/auth.context'
import { useSearchUnfocus } from '@/hooks/searchUnfocus'
import { useShopStatus } from '@/hooks/shopstatus.hook'
import { usePlates } from '@/hooks/plates.hook'
import { useMenu } from '@/hooks/menu.hook'
import { usePlateOptions } from '@/hooks/plateOptions.hook'
import { AdminPlatesCards } from '@/components/AdminPlatesCards'
import { Folding } from '@/components/Folding'
import PlateOrder from '@/components/PlateOrder'
import { FormAddPlate, FormSearchPlate } from '@/components/FormPlate'
import { FormMenu } from '@/components/FormMenu'
import CardMenuPlate from '@/components/CardMenuPlate'
import { getErrorMessage, runWhithAuth } from '@/utils'
import { Logout } from '@/icons/Logout'
import type { MouseModifyPlate, FormModifyPlate } from '@/types/local'
import type { Plate, Menu, ShopStatus } from '@/types/server'

interface ServerSideProps {
  shopStatus: ShopStatus
  plates: Plate[]
  menu: Menu[]
}

export const HomePage: React.FC<ServerSideProps> = (serverSideProps: ServerSideProps) => {
  const { authenticated, logout } = useAuthContext()
  const { shopstatus, switchStatus } = useShopStatus(serverSideProps.shopStatus)
  const { plates, submitPlate, updatePlateFromInventory, deletePlateFromInventory } = usePlates(
    serverSideProps.plates
  )
  const router = useRouter()

  const {
    menu,
    submitMenu,
    submitMenuBySearchResult,
    switchStatusMenu,
    updatePlateFromMenu,
    deletePlateFromMenu
  } = useMenu(serverSideProps.menu)

  const searchUnfocusOptions = useSearchUnfocus()
  const { searchUnfocus, searchUnfocusTunOn } = searchUnfocusOptions

  const platesOptions = usePlateOptions()
  const { disableEditing } = platesOptions

  const deletePlateFromInventoryAndMenu: MouseModifyPlate = async (e, plate) => {
    try {
      const plateInMenu = menu.find(current => current.plate._id === plate._id)
      if (plateInMenu !== undefined) await deletePlateFromMenu(e, plateInMenu)
      await deletePlateFromInventory(e, plate)
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  const updatePlateFromInventoryAndMenu: FormModifyPlate = async (e, plate) => {
    e.preventDefault()

    try {
      await updatePlateFromInventory(e, plate)
      updatePlateFromMenu(plate)
      disableEditing()
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  return (
    <main
      className='flex min-h-screen justify-center p-8'
      onClick={() => !searchUnfocus && searchUnfocusTunOn()}
    >
      <div className='flex w-full max-w-xl flex-col gap-5'>
        <header className='flex items-center justify-center gap-2 rounded-md bg-superdark px-8  py-2 font-bold italic'>
          <div
            className='relative h-9 w-9 shrink-0 object-cover'
            onDoubleClick={runWhithAuth(() => router.push('/login'), authenticated, true)}
          >
            <Image
              alt='chef-hat'
              src='/favicon.ico'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <h1 className='text-center leading-none'>Restaurante SF🚀</h1>
          <span
            className={`cursor-pointer rounded-sm px-3 py-1 ${
              shopstatus === 'Abierto' ? 'bg-emerald-400' : 'bg-red-400'
            }`}
            onClick={runWhithAuth(switchStatus, authenticated)}
          >
            {shopstatus}
          </span>
          {authenticated && (
            <span className='cursor-pointer rounded-full bg-dark p-1 text-3xl' onClick={logout}>
              <Logout />
            </span>
          )}
        </header>
        {authenticated && (
          <section className='flex flex-col gap-2'>
            <Folding summary='Inventario'>
              <div className='flex flex-col gap-2 bg-superdark'>
                <FormSearchPlate
                  plates={plates}
                  deletePlate={deletePlateFromInventoryAndMenu}
                  updatePlate={updatePlateFromInventoryAndMenu}
                  searchUnfocusOptions={searchUnfocusOptions}
                />
                <Folding summary='Ver todos los platos'>
                  <AdminPlatesCards
                    plates={plates}
                    platesOptions={platesOptions}
                    deletePlate={deletePlateFromInventoryAndMenu}
                    runUpdate={updatePlateFromInventoryAndMenu}
                  />
                </Folding>
              </div>
            </Folding>
            <Folding summary='Agregar plato al inventario'>
              <FormAddPlate handleSubmit={submitPlate} />
            </Folding>
          </section>
        )}
        <section className='flex min-w-[240px] flex-col gap-[2px] rounded-sm border-2 border-light bg-light'>
          <h2 className='bg-superdark p-2 text-center font-bold'>Menú - 2.5$ Completo</h2>
          {authenticated && (
            <FormMenu
              handleSubmit={submitMenu}
              submitBySearchResult={submitMenuBySearchResult}
              plates={plates}
              searchUnfocusOptions={searchUnfocusOptions}
            />
          )}
          <PlateOrder title='Entrante - 1.5$ solo, sin segundo'>
            {menu.map(plateInMenu => {
              const { plate } = plateInMenu
              if (plate.order !== 'Entrante') return false
              return (
                <CardMenuPlate
                  key={crypto.randomUUID()}
                  menu={plateInMenu}
                  switchStatus={switchStatusMenu}
                  deletePlateFromMenu={deletePlateFromMenu}
                  authenticated={authenticated}
                />
              )
            })}
          </PlateOrder>
          <PlateOrder title='Segundo - 1.5$ solo, sin entrante'>
            {menu.map(plateInMenu => {
              const { plate } = plateInMenu
              if (plate.order !== 'Segundo') return false
              return (
                <CardMenuPlate
                  key={crypto.randomUUID()}
                  menu={plateInMenu}
                  switchStatus={switchStatusMenu}
                  deletePlateFromMenu={deletePlateFromMenu}
                  authenticated={authenticated}
                />
              )
            })}
          </PlateOrder>
        </section>
      </div>
    </main>
  )
}
