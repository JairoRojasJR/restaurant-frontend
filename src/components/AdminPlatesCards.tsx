import React from 'react'
import { type UsePlateOptionsProps } from '@/hooks/plateOptions.hook'
import {
  CardInventoryPlate,
  type Props as CardInventoryProps
} from '@/components/CardInventoryPlate'
import { FormUpdatePlate, type FormUpdatePlateProps } from '@/components/FormPlate'
import { type Plate } from '@/types/server'

interface Props {
  plates: Plate[]
  platesOptions: UsePlateOptionsProps
  deletePlate: CardInventoryProps['deletePlate']
  runUpdate: FormUpdatePlateProps['runUpdate']
  searching?: string
}

export const AdminPlatesCards: React.FC<Props> = ({
  plates,
  platesOptions,
  deletePlate,
  runUpdate,
  searching
}: Props) => {
  const { editing, disableEditing } = platesOptions

  return (
    <section className='grid max-h-[400px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 overflow-y-auto p-2'>
      {plates.map(plate => {
        if (editing !== plate._id) {
          return (
            <CardInventoryPlate
              key={crypto.randomUUID()}
              data={plate}
              platesOptions={platesOptions}
              deletePlate={deletePlate}
              searching={searching}
            />
          )
        } else {
          return (
            <div
              key={crypto.randomUUID()}
              className='overflow-hidden rounded-sm border-2 border-solid border-violet'
            >
              <FormUpdatePlate plate={plate} runUpdate={runUpdate} cancelUpdate={disableEditing} />
            </div>
          )
        }
      })}
    </section>
  )
}
