'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import OrderPlate from '@/components/OrderPlate'
import CardPlate from '@/components/CardPlate'
import type { Plate } from '@/types/types'

export default function Home(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [plates, setPlates] = useState<Plate[]>([])

  const handleClick = (): void => {
    setOpen(!open)
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const req = await fetch('/api/plate', {
      method: 'POST',
      body: formData
    })

    await req.json()
  }

  useEffect(() => {
    ;(async () => {
      const req = await fetch('api/plate')
      const res = await req.json()
      setPlates(res.plates)
    })().catch((e: Error) => {
      console.log(e.message)
    })
  }, [])

  // RESOURCES
  const typeOrderOptions: Array<Plate['order']> = ['Entrante', 'Segundo']

  return (
    <main className='flex min-h-screen justify-center p-8'>
      <div className='flex w-full max-w-xl flex-col gap-5'>
        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <section className='flex flex-col'>
            <label>Nombre del plato</label>
            <input name='name' />
          </section>
          <section className='flex flex-col'>
            <label>Imagen</label>
            <input name='image' type='file' />
          </section>
          <section className='flex flex-col'>
            <label>Tipo de orden</label>
            <select className='p-2' name='order'>
              {typeOrderOptions.map(typeOrder => {
                return (
                  <option key={crypto.randomUUID()} value={typeOrder}>
                    {typeOrder}
                  </option>
                )
              })}
            </select>
          </section>
          <input
            className='cursor-pointer rounded-sm bg-superdark px-8 py-2'
            type='submit'
          />
        </form>
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
              open ? 'bg-emerald-400' : 'bg-red-400'
            }`}
            onClick={handleClick}
          >
            {open ? 'Abierto' : 'Cerrado'}
          </span>
        </div>
        <section className='flex flex-col gap-[2px] rounded-sm border-2 border-light bg-light'>
          <h2 className='bg-superdark p-2 text-center font-bold'>
            Menú - 2.5$ Completo
          </h2>
          <OrderPlate typeOrder='Entrante - 1.5$ solo, sin segundo'>
            {plates.map(plate => {
              if (plate.order !== 'Entrante') return false
              return (
                <CardPlate
                  key={crypto.randomUUID()}
                  name={plate.name}
                  src={plate.image}
                />
              )
            })}
          </OrderPlate>
          <OrderPlate typeOrder='Segundo - 1.5$ solo, sin entrante'>
            {plates.map(plate => {
              if (plate.order !== 'Segundo') return false
              return (
                <CardPlate
                  key={crypto.randomUUID()}
                  name={plate.name}
                  src={plate.image}
                />
              )
            })}
          </OrderPlate>
        </section>
      </div>
    </main>
  )
}
