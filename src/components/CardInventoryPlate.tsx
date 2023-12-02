import { BACKEND_STREAMING_IMAGE } from '@/globalVars'
import Image from 'next/image'
import { type UsePlateOptionsProps } from '@/hooks/plateOptions.hook'
import { splitBySearch } from '@/utils'
import { DotsVertical } from '@/icons/Dots-Vertical'
import { type Plate } from '@/types/server'
import { type MouseModifyPlate } from '@/types/local'

export interface Props {
  data: Plate
  platesOptions: UsePlateOptionsProps
  deletePlate: MouseModifyPlate
  searching?: string
}

export const CardInventoryPlate: React.FC<Props> = ({
  data,
  platesOptions,
  deletePlate,
  searching
}: Props) => {
  const { _id, name, image } = data
  const imageUrl = `${BACKEND_STREAMING_IMAGE}/${image}`
  const { editing, optionsOpened, setIdInEditing, setIdInOptionsOpened, disableOptionsOpened } =
    platesOptions

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
                onClick={async e => await deletePlate(e, data)}
              >
                Eliminar
              </span>
            </section>
          )}
        </aside>
      )}
      {searching === undefined ? (
        <span className='text-center'>{data.name}</span>
      ) : (
        <span>
          {splitBySearch(name, searching).map(chunk => {
            return (
              <span key={crypto.randomUUID()}>
                {chunk.toUpperCase() === searching.toUpperCase() ? (
                  <span className='text-emerald-400'>{chunk}</span>
                ) : (
                  chunk
                )}
              </span>
            )
          })}
        </span>
      )}
    </article>
  )
}
