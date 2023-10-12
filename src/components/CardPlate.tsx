import Image from 'next/image'
import { useState } from 'react'

interface Props {
  name: string
  src: string
}

export default function Plate({ name, src }: Props): JSX.Element {
  const [unavailable, setUnavailable] = useState(false)
  const imageUrl = `api/stream/${src}`

  const handleClick = (): void => {
    setUnavailable(!unavailable)
  }

  return (
    <div
      className={`border-b-2 border-dark pb-2 last:border-b-0 ${
        unavailable ? 'grayscale' : ''
      }`}
    >
      <article
        className={`flex cursor-pointer items-center gap-3 rounded-sm p-2 ${
          unavailable ? 'bg-slate-700' : ''
        }`}
        onClick={handleClick}
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
        <span className={`grow ${unavailable ? 'line-through' : ''}`}>
          {name}
        </span>
      </article>
    </div>
  )
}
