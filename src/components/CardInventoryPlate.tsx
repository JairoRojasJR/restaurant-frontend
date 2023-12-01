import Image from 'next/image'
import { BACKEND_STREAMING_IMAGE } from '@/globalVars'
import { type Plate } from '@/types/server'
import { DotsVertical } from '@/icons/Dots-Vertical'
import { type MouseModifyPlate } from '@/types/local'

interface Props {
  data: Plate
  editing: boolean | string
  setIdInEditing: (_id: string) => void
  optionsOpened: boolean | string
  setIdInOptionsOpened: (_id: string) => void
  disableOptionsOpened: () => void
  deletePlateFromInventoryAndMenu: MouseModifyPlate
}

export const CardInventoryPlate: React.FC<Props> = ({
  data,
  editing,
  setIdInEditing,
  optionsOpened,
  setIdInOptionsOpened,
  disableOptionsOpened,
  deletePlateFromInventoryAndMenu
}: Props) => {
  const { _id, image } = data
  const imageUrl = `${BACKEND_STREAMING_IMAGE}/${image}`

  return (
    <article
      className='relative flex flex-col items-center justify-center rounded-sm bg-dark p-2'
      style={editing !== false ? { filter: 'brightness(0.3)' } : {}}
    >
      <div className='overflow-hidden rounded-sm'>
        <Image
          className='object-cover'
          alt={data.name}
          loader={data => `${imageUrl}?width=${data.width}`}
          src={imageUrl}
          width={150}
          height={125}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      {editing === false && (
        <aside className='absolute right-2 top-2'>
          <div
            className={`rounded-full p-2 hover:bg-superdark ${
              optionsOpened === data._id && 'bg-superdark'
            }`}
            onClick={() =>
              optionsOpened !== data._id ? setIdInOptionsOpened(data._id) : disableOptionsOpened()
            }
          >
            <DotsVertical className='cursor-pointer text-3xl' />
          </div>
          {optionsOpened === data._id && (
            <section className='absolute right-0 top-full flex cursor-pointer flex-col gap-2 rounded-sm bg-superdark'>
              <span className='p-2 px-6 hover:bg-dark' onClick={() => setIdInEditing(_id)}>
                Editar
              </span>
              <span
                className='p-2 px-6 hover:bg-dark'
                onClick={async e => await deletePlateFromInventoryAndMenu(e, data)}
              >
                Eliminar
              </span>
            </section>
          )}
        </aside>
      )}
      <span className='text-center'>{data.name}</span>
    </article>
  )
}
