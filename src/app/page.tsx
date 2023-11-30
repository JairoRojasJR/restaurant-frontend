'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { useShopStatus } from '@/hooks/shopstatus.hook'
import { usePlates } from '@/hooks/plates.hook'
import { useMenu } from '@/hooks/menu.hook'
import PlateOrder from '@/components/PlateOrder'
import CardMenuPlate from '@/components/CardMenuPlate'
import { FormAddPlate, FormUpdatePlate } from '@/components/FormPlate'
import { FormMenu } from '@/components/FormMenu'
import { Folding } from '@/components/Folding'
import { CardInventoryPlate } from '@/components/CardInventoryPlate'
import { getErrorMessage } from '@/utils'
import type { MouseModifyPlate, FormModifyPlate } from '@/types/local'

export default function Home(): JSX.Element {
  const { shopstatus, switchStatus } = useShopStatus()
  const { plates, submitPlate, updatePlateFromInventory, deletePlateFromInventory } = usePlates()
  const { menu, submitMenu, switchStatusMenu, updatePlateFromMenu, deletePlateFromMenu } = useMenu()

  const [editing, setEditing] = useState<boolean | string>(false)
  const [optionsOpened, setOptionsOpened] = useState<boolean | string>(false)

  const setIdInEditing = (_id: string): void => {
    disableOptionsOpened()
    setEditing(_id)
  }
  const disableEditing = (): void => setEditing(false)

  const setIdInOptionsOpened = (_id: string): void => setOptionsOpened(_id)
  const disableOptionsOpened = (): void => setOptionsOpened(false)

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
      setEditing(false)
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  return (
    <main className='flex min-h-screen justify-center p-8'>
      <div className='flex w-full max-w-xl flex-col gap-5'>
        <Folding summary='Inventario' open>
          <div className='flex flex-col gap-2 bg-superdark'>
            <form className='bg-superdark'>
              <input
                className='w-full border-b-2 border-violet p-2'
                placeholder='Buscar plato del menú'
              />
            </form>
            <Folding summary='Ver todos los platos'>
              <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 p-2'>
                {plates.map(plate => {
                  if (editing !== plate._id) {
                    return (
                      <CardInventoryPlate
                        key={crypto.randomUUID()}
                        data={plate}
                        editing={editing}
                        setIdInEditing={setIdInEditing}
                        optionsOpened={optionsOpened}
                        setIdInOptionsOpened={setIdInOptionsOpened}
                        disableOptionsOpened={disableOptionsOpened}
                        deletePlateFromInventoryAndMenu={deletePlateFromInventoryAndMenu}
                      />
                    )
                  } else {
                    return (
                      <div
                        key={crypto.randomUUID()}
                        className='overflow-hidden rounded-sm border-2 border-solid border-violet'
                      >
                        <FormUpdatePlate
                          plate={plate}
                          handleSubmit={updatePlateFromInventoryAndMenu}
                          onCancel={disableEditing}
                        />
                      </div>
                    )
                  }
                })}
              </div>
            </Folding>
          </div>
        </Folding>
        <Folding summary='Agregar plato al inventario'>
          <FormAddPlate handleSubmit={submitPlate} />
        </Folding>
        <div className='flex items-center justify-center gap-2 rounded-md bg-superdark px-8  py-2 font-bold italic'>
          <div className='relative h-9 w-9 shrink-0 object-cover'>
            <Image
              alt='chef-hat'
              src='/favicon.ico'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <h1 className='text-center leading-none'>Restaurante SF</h1>
          <span
            className={`cursor-pointer rounded-sm px-3 py-1 ${
              shopstatus === 'Abierto' ? 'bg-emerald-400' : 'bg-red-400'
            }`}
            onClick={switchStatus}
          >
            {shopstatus}
          </span>
        </div>
        <section className='flex min-w-[240px] flex-col gap-[2px] rounded-sm border-2 border-light bg-light'>
          <h2 className='bg-superdark p-2 text-center font-bold'>Menú - 2.5$ Completo</h2>
          <FormMenu handleSubmit={submitMenu} />
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
                />
              )
            })}
          </PlateOrder>
        </section>
      </div>
    </main>
  )
}
