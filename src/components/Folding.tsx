interface Props extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  children: React.ReactNode
  summary: string
}

export const Folding: React.FC<Props> = ({ children, summary, ...props }: Props) => {
  return (
    <details {...props}>
      <summary className='rounded-sm border-2 border-violet bg-superdark p-2'>{summary}</summary>
      {children}
    </details>
  )
}
