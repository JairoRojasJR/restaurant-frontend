import { type PlateOrder as PlateOrderType } from '@/types/server'

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown
}

export const FormPlate: React.FC<Props> = ({ handleSubmit }: Props) => {
  const typeOrderOptions: PlateOrderType[] = ['Entrante', 'Segundo']

  return (
    <form
      className='flex flex-col gap-2 rounded-sm bg-superdark p-2'
      onSubmit={handleSubmit}
      encType='multipart/form-data'
    >
      <section className='flex flex-col'>
        <label>Nombre del plato</label>
        <input className='border-b-2 border-violet' name='name' />
      </section>
      <section className='flex flex-col'>
        <label>Imagen</label>
        <input className='border-b-2 border-violet' name='image' type='file' />
      </section>
      <section className='flex flex-col'>
        <label>Tipo de orden</label>
        <select className='border-b-2 border-violet p-2' name='order'>
          {typeOrderOptions.map(typeOrder => {
            return (
              <option key={crypto.randomUUID()} value={typeOrder}>
                {typeOrder}
              </option>
            )
          })}
        </select>
      </section>
      <button className='cursor-pointer rounded-sm bg-dark px-8 py-2 hover:outline hover:outline-2 hover:outline-violet'>
        Agregar
      </button>
    </form>
  )
}
