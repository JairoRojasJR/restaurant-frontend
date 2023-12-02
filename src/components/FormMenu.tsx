import { BACKEND_STREAMING_IMAGE } from '@/globalVars'
import { useRef } from 'react'
import Image from 'next/image'
import { useSearchPlate } from '@/hooks/shearchPlate.hook'
import { splitBySearch } from '@/utils'
import { type Plate } from '@/types/server'

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown
  submitBySearchResult: (plateName: string) => unknown
  plates: Plate[]
}

export const FormMenu: React.FC<Props> = ({
  handleSubmit,
  submitBySearchResult,
  plates
}: Props) => {
  const { searching, shearchResults, panelStatus, openPanel, closePanel, onTyping } =
    useSearchPlate(plates)
  const formRef = useRef<HTMLFormElement | null>(null)

  const submitPlate = (e: React.MouseEvent<HTMLElement>, plateName: string): void => {
    submitBySearchResult(plateName)
    formRef.current?.reset()
    closePanel()
  }

  return (
    <form
      ref={formRef}
      className='flex flex-col gap-2 rounded-sm bg-superdark p-2'
      onSubmit={handleSubmit}
    >
      <input name='status' defaultValue='Disponible' hidden />
      <div className='relative m-auto w-full self-center'>
        <input
          className='w-full border-b-2 border-violet p-2'
          name='plate'
          placeholder='Agregar plato al menú'
          autoComplete='off'
          onFocus={() => searching.length > 0 && openPanel()}
          onBlur={closePanel}
          onChange={onTyping}
        />
        {panelStatus === 'open' && (
          <aside className='absolute top-full z-10 my-2 flex max-h-[200px] w-full flex-col gap-2 overflow-y-auto rounded-sm bg-dark p-2 outline outline-violet'>
            {shearchResults.length === 0 && <span>No se encontró el plato</span>}
            {shearchResults.map(plate => {
              const { name, image } = plate
              const imageUrl = `${BACKEND_STREAMING_IMAGE}/${image}`

              return (
                <article
                  key={crypto.randomUUID()}
                  className='flex cursor-pointer items-center gap-2 bg-superdark'
                  onClick={e => submitPlate(e, name)}
                >
                  <Image
                    className='rounded-sm'
                    alt={name}
                    src={imageUrl}
                    loader={data => `${imageUrl}?width=${data.width}`}
                    width={75}
                    height={75}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
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
                </article>
              )
            })}
          </aside>
        )}
      </div>
      <button>Agregar</button>
    </form>
  )
}
