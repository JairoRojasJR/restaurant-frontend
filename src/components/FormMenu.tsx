interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown
}

export const FormMenu: React.FC<Props> = ({ handleSubmit }: Props) => {
  return (
    <form className='flex flex-col gap-2 rounded-sm bg-superdark p-2' onSubmit={handleSubmit}>
      <h3 className='rounded-sm border-2 border-violet p-2 text-center'>Agregar plato al menú</h3>
      <input name='status' defaultValue='Disponible' hidden />
      <section className='flex flex-col'>
        <label>Nombre del plato</label>
        <input className='border-b-2 border-violet' name='plate' />
      </section>
      <button className='cursor-pointer rounded-sm bg-dark px-8 py-2 hover:outline hover:outline-2 hover:outline-violet'>
        Agregar
      </button>
    </form>
  )
}
