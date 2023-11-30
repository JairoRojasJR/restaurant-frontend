interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown
}

export const FormMenu: React.FC<Props> = ({ handleSubmit }: Props) => {
  return (
    <form className='flex flex-col gap-2 rounded-sm bg-superdark p-2' onSubmit={handleSubmit}>
      <input name='status' defaultValue='Disponible' hidden />
      <input
        className='border-b-2 border-violet p-2'
        name='plate'
        placeholder='Agregar plato al menú'
      />
      <button>Agregar</button>
    </form>
  )
}
