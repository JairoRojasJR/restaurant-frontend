import Image from 'next/image'
import { BACKEND_STREAMING_IMAGE } from '@/globalVars'
import { type Menu } from '@/types/server'
import { TrashIcon } from '@/icons/Trash'
import type { MouseModifyMenu } from '@/types/local'

interface Props {
  menu: Menu
  switchStatus: MouseModifyMenu
  deletePlateFromMenu: MouseModifyMenu
}

export default function Plate({ menu, switchStatus, deletePlateFromMenu }: Props): JSX.Element {
  const { status, plate } = menu
  const { name, image } = plate
  const imageUrl = `${BACKEND_STREAMING_IMAGE}/${image}`
  const unavailable = status === 'Agotado'

  return (
    <div
      className={`border-b-2 border-dark pb-2 last:border-b-0 ${unavailable ? 'grayscale' : ''}`}
    >
      <article
        className={`grid cursor-pointer grid-cols-[50px_minmax(100px,1fr)] items-center gap-3 rounded-sm p-2 ${
          unavailable ? 'bg-slate-700' : ''
        }`}
        onClick={async e => {
          await switchStatus(e, menu)
        }}
      >
        <aside
          className='rounded-full'
          onClick={async e => {
            await deletePlateFromMenu(e, menu)
          }}
        >
          <TrashIcon
            className='rounded-full p-2 hover:bg-red-400 hover:stroke-red-900'
            stroke='#fff'
          />
        </aside>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <div className='relative shrink-0 overflow-hidden rounded-sm'>
            <Image
              className='object-cover'
              alt={name}
              loader={data => `${imageUrl}?width=${data.width}`}
              src={imageUrl}
              width={200}
              height={100}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <span className={`${unavailable ? 'line-through' : ''}`}>{name}</span>
        </div>
      </article>
    </div>
  )
}
