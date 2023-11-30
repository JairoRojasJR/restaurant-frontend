import { type FormModifyPlate } from '@/types/local'
import type { Plate, PlateOrder as PlateOrderType } from '@/types/server'

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown
}

interface FormPlateProps extends Props {
  children: React.ReactNode
  plate?: Plate
}

export const FormPlate: React.FC<FormPlateProps> = ({
  children,
  plate,
  handleSubmit
}: FormPlateProps) => {
  const typeOrderOptions: PlateOrderType[] = ['Entrante', 'Segundo']

  return (
    <form
      className='flex flex-col gap-2 rounded-sm bg-superdark p-2'
      onSubmit={handleSubmit}
      encType='multipart/form-data'
    >
      <section className='flex flex-col'>
        <label>Nombre del plato</label>
        <input className='border-b-2 border-violet' name='name' defaultValue={plate?.name} />
      </section>
      <section className='flex flex-col'>
        <label>Imagen</label>
        <input className='border-b-2 border-violet' name='image' type='file' />
      </section>
      <section className='flex flex-col'>
        <label>Tipo de orden</label>
        <select className='border-b-2 border-violet p-2' name='order' defaultValue={plate?.order}>
          {typeOrderOptions.map(typeOrder => {
            return (
              <option key={crypto.randomUUID()} value={typeOrder}>
                {typeOrder}
              </option>
            )
          })}
        </select>
      </section>
      {children}
    </form>
  )
}

export const FormAddPlate: React.FC<Props> = ({ handleSubmit }: Props) => {
  return (
    <FormPlate handleSubmit={handleSubmit}>
      <button className='cursor-pointer rounded-sm bg-dark px-8 py-2 hover:outline hover:outline-2 hover:outline-violet'>
        Agregar
      </button>
    </FormPlate>
  )
}

interface FormUpdatePlateProps {
  plate: Plate
  handleSubmit: FormModifyPlate
  onCancel: () => void
}

export const FormUpdatePlate: React.FC<FormUpdatePlateProps> = ({
  plate,
  handleSubmit,
  onCancel
}: FormUpdatePlateProps) => {
  return (
    <FormPlate plate={plate} handleSubmit={async e => await handleSubmit(e, plate)}>
      <div className='flex gap-2'>
        <button className='grow rounded-sm bg-emerald-400 py-2 text-dark'>Actualizar</button>
        <button className='grow rounded-sm bg-red-400 py-2 text-dark' onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </FormPlate>
  )
}
