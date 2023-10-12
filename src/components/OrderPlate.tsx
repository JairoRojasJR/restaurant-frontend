interface Props {
  children: React.ReactNode
  typeOrder: string
}

export default function OrderPlate({
  children,
  typeOrder
}: Props): JSX.Element {
  return (
    <div className='flex flex-col gap-2 bg-superdark p-4'>
      <h3 className='my-3 rounded-sm bg-dark text-center italic'>
        {typeOrder}
      </h3>
      {children}
    </div>
  )
}
