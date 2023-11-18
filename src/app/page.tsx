'use client'

import Image from 'next/image'
import { useShopStatus } from '@/hooks/shopstatus.hook'
import { usePlates } from '@/hooks/plates.hook'
import { useMenu } from '@/hooks/menu.hook'
import PlateOrder from '@/components/PlateOrder'
import CardMenuPlate from '@/components/CardMenuPlate'
import { FormPlate } from '@/components/FormPlate'
import { FormMenu } from '@/components/FormMenu'

export default function Home(): JSX.Element {
  const { shopstatus, switchStatus } = useShopStatus()
  const { submitPlate } = usePlates()
  const { menu, submitMenu, switchStatusMenu, deletePlateFromMenu } = useMenu()

  return (
    <main className='flex min-h-screen justify-center p-8'>
      <div className='flex w-full max-w-xl flex-col gap-5'>
        <details>
          <summary className='rounded-sm border-2 border-violet bg-superdark p-2'>
            Agregar plato al inventario
          </summary>
          <FormPlate handleSubmit={submitPlate} />
        </details>
        <details>
          <summary className='rounded-sm border-2 border-violet bg-superdark p-2'>
            Agregar plato al menú
          </summary>
          <FormMenu handleSubmit={submitMenu} />
        </details>
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
