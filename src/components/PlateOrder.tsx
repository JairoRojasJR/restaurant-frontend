interface Props {
  children: React.ReactNode
  title: string
}

export default function PlateOrder({ children, title }: Props): JSX.Element {
  return (
    <div className='flex min-h-[400px] flex-col gap-2 bg-superdark p-4'>
      <h3 className='my-3 rounded-sm bg-dark text-center italic'>{title}</h3>
      {children}
    </div>
  )
}
