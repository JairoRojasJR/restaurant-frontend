import Image from 'next/image'
import { BACKEND_STREAMING_IMAGE } from '@/globalVars'
import { type Menu } from '@/types/server'

interface Props {
  menu: Menu
  switchStatus: (e: React.MouseEvent<HTMLElement>) => unknown
}

export default function Plate({ menu, switchStatus }: Props): JSX.Element {
  const { _id, status, plate } = menu
  const { name, image } = plate
  const imageUrl = `${BACKEND_STREAMING_IMAGE}/${image}`
  const unavailable = status === 'Agotado'

  return (
    <div
      className={`border-b-2 border-dark pb-2 last:border-b-0 ${unavailable ? 'grayscale' : ''}`}
    >
      <article
        id={_id}
        className={`flex cursor-pointer items-center gap-3 rounded-sm p-2 ${
          unavailable ? 'bg-slate-700' : ''
        }`}
        onClick={switchStatus}
      >
        <div className='relative h-32 w-32 overflow-hidden rounded-sm'>
          <Image
            className='object-cover'
            alt={name}
            loader={data => `${imageUrl}?width=${data.width}`}
            src={imageUrl}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <span className={`grow ${unavailable ? 'line-through' : ''}`}>{name}</span>
      </article>
    </div>
  )
}
