import { type Menu } from './server'

interface SVGProps {
  stroke?: `#${string}` | `var(--${string})`
  className?: string
  style?: React.CSSProperties
}

type ModifyMenu = (e: React.MouseEvent<HTMLElement>, menu: Menu) => Promise<void>
