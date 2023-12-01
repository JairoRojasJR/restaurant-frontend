import type { Plate, Menu } from './server'

type MouseEvt = React.MouseEvent<HTMLElement>
type FormEvt = React.FormEvent<HTMLFormElement>

interface SVGProps {
  stroke?: `#${string}` | `var(--${string})`
  className?: string
  style?: React.CSSProperties
}
type ModifyPlate<T> = (e: T, plate: Plate) => Promise<void>
type MouseModifyPlate = ModifyPlate<MouseEvt>
type FormModifyPlate = ModifyPlate<FormEvt>

type ModifyMenu<T> = (e: T, menu: Menu) => Promise<void>
type MouseModifyMenu = ModifyMenu<MouseEvt>

type SubmitAsync = (e: React.FormEvent<HTMLFormElement>) => Promise<void>
