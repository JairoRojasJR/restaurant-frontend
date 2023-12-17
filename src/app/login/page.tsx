'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/auth.context'

export default function Login(): JSX.Element {
  const { authenticated, login } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (authenticated) router.push('/')
  }, [authenticated])

  return (
    <main className='flex h-screen items-center justify-center p-5'>
      <form
        className='flex max-w-sm grow flex-col gap-5 rounded-sm bg-superdark p-7'
        onSubmit={login}
      >
        <section className='flex flex-col'>
          <label className='px-2 text-slate-300'>Usuario</label>
          <input className='border-b-2 border-violet p-2' name='username' />
        </section>
        <section className='flex flex-col'>
          <label className='px-2 text-slate-300'>Contraseña</label>
          <input className='border-b-2 border-violet p-2' name='password' />
        </section>
        <button className='rounded-sm border-2 border-violet bg-superdark p-2 hover:bg-dark'>
          Iniciar sesión
        </button>
      </form>
    </main>
  )
}
