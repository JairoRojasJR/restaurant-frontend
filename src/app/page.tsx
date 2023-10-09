'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface PlateProps {
  name: string
  src: string
}

function Plate({ name, src }: PlateProps): JSX.Element {
  const [unavailable, setUnavailable] = useState(false)

  const handleClick = (): void => {
    setUnavailable(!unavailable)
  }

  useEffect(() => {
    console.log(unavailable)
  }, [unavailable])

  return (
    <div
      className={`border-b-2 border-dark pb-2 last:border-b-0 ${
        unavailable ? 'grayscale' : ''
      }`}
    >
      <article
        className={`flex items-center gap-3 rounded-sm p-2 ${
          unavailable ? 'bg-slate-700' : ''
        }`}
        onClick={handleClick}
      >
        <div className='relative h-32 w-32 overflow-hidden rounded-sm object-cover'>
          <Image
            alt={name}
            src={src}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <span className={`grow ${unavailable ? 'line-through' : ''}`}>
          {name}
        </span>
      </article>
    </div>
  )
}

interface OrderPlateProps {
  children: React.ReactNode
  typeOrder: string
}

function OrderPlate({ children, typeOrder }: OrderPlateProps): JSX.Element {
  return (
    <div className='flex flex-col gap-2 bg-superdark p-4'>
      <h3 className='my-3 rounded-sm bg-dark text-center italic'>
        {typeOrder}
      </h3>
      {children}
    </div>
  )
}

export default function Home(): JSX.Element {
  return (
    <main className='flex min-h-screen justify-center p-8'>
      <div className='flex w-full max-w-xl flex-col gap-5'>
        <div className='flex items-center justify-center gap-2 rounded-md bg-superdark px-8  py-2 font-bold italic'>
          <div className='relative h-9 w-9 object-cover'>
            <Image
              alt='chef-hat'
              src='/favicon.ico'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <h1 className='text-center leading-none'>Restaurante SF</h1>
          <span className='rounded-sm bg-emerald-400 px-3 py-1'>Abierto</span>
        </div>
        <section className='flex flex-col gap-[2px] rounded-sm border-2 border-light bg-light'>
          <h2 className='bg-superdark p-2 text-center font-bold'>
            Menú - 2.5$ Completo
          </h2>
          <OrderPlate typeOrder='Entrante - 1.5$ solo, sin segundo'>
            <Plate name='Sopa de lentejas' src='/sopa-de-lentejas.png' />
            <Plate name='Sopa de fideos' src='/sopa-fideos.png' />
          </OrderPlate>
          <OrderPlate typeOrder='Segundo - 1.5$ solo, sin entrante'>
            <Plate name='Pollo al horno' src='/arroz-con-pollo-al-horno.png' />
            <Plate
              name='Tortilla de camaron'
              src='/arroz-con-tortilla-de-camaron.png'
            />
          </OrderPlate>
        </section>
      </div>
    </main>
  )
}
