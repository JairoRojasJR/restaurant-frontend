import { useSearchPlate } from '@/hooks/shearchPlate.hook'
import { usePlateOptions } from '@/hooks/plateOptions.hook'
import { type UseSearchUnfocus } from '@/hooks/searchUnfocus'
import { AdminPlatesCards } from '@/components/AdminPlatesCards'
import { type Props as CardInventoryProps } from '@/components/CardInventoryPlate'
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

export interface FormUpdatePlateProps {
  plate: Plate
  runUpdate: FormModifyPlate
  cancelUpdate: () => void
}

export const FormUpdatePlate: React.FC<FormUpdatePlateProps> = ({
  plate,
  runUpdate,
  cancelUpdate
}: FormUpdatePlateProps) => {
  return (
    <FormPlate plate={plate} handleSubmit={async e => await runUpdate(e, plate)}>
      <div className='flex gap-2'>
        <button className='grow rounded-sm bg-emerald-400 py-2 text-dark'>Actualizar</button>
        <button className='grow rounded-sm bg-red-400 py-2 text-dark' onClick={cancelUpdate}>
          Cancelar
        </button>
      </div>
    </FormPlate>
  )
}

interface FormSearchPlateProps {
  plates: Plate[]
  deletePlate: CardInventoryProps['deletePlate']
  updatePlate: FormUpdatePlateProps['runUpdate']
  searchUnfocusOptions: UseSearchUnfocus
}

export const FormSearchPlate: React.FC<FormSearchPlateProps> = ({
  plates,
  deletePlate,
  updatePlate,
  searchUnfocusOptions
}: FormSearchPlateProps) => {
  const { searchUnfocus, searchUnfocusTunOff } = searchUnfocusOptions
  const { searching, shearchResults, panelStatus, onTyping, handleFocus } = useSearchPlate(
    plates,
    searchUnfocus,
    searchUnfocusTunOff
  )
  const plateOptions = usePlateOptions()
  const { disableEditing } = plateOptions

  const runUpdate: FormUpdatePlateProps['runUpdate'] = async (e, plate) => {
    await updatePlate(e, plate)
    disableEditing()
  }

  return (
    <section
      className='flex flex-col gap-2 rounded-sm bg-superdark'
      onClick={e => e.stopPropagation()}
    >
      <div className='relative z-20 m-auto w-full self-center'>
        <input
          className='w-full border-b-2 border-violet p-2'
          name='plate'
          placeholder='Buscar plato en el inventario'
          autoComplete='off'
          onFocus={handleFocus}
          onChange={onTyping}
        />
        {panelStatus === 'open' && (
          <aside className='absolute top-full z-10 my-2 flex max-h-[400px] w-full flex-col gap-2 rounded-sm bg-superdark p-2 outline outline-violet'>
            {shearchResults.length === 0 && <span>No se encontró el plato</span>}
            <AdminPlatesCards
              plates={shearchResults}
              platesOptions={plateOptions}
              runUpdate={runUpdate}
              deletePlate={deletePlate}
              searching={searching}
            />
          </aside>
        )}
      </div>
    </section>
  )
}
