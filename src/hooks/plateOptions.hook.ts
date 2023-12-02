import { useState } from 'react'

export interface UsePlateOptionsProps {
  editing: boolean | string
  optionsOpened: boolean | string
  setIdInEditing: (_id: string) => void
  disableEditing: () => void
  setIdInOptionsOpened: (_id: string) => void
  disableOptionsOpened: () => void
}

export const usePlateOptions = (): UsePlateOptionsProps => {
  const [editing, setEditing] = useState<UsePlateOptionsProps['editing']>(false)
  const [optionsOpened, setOptionsOpened] = useState<UsePlateOptionsProps['optionsOpened']>(false)

  const setIdInEditing: UsePlateOptionsProps['setIdInEditing'] = _id => {
    disableOptionsOpened()
    setEditing(_id)
  }
  const disableEditing: UsePlateOptionsProps['disableEditing'] = () => setEditing(false)

  const setIdInOptionsOpened: UsePlateOptionsProps['setIdInOptionsOpened'] = _id =>
    setOptionsOpened(_id)
  const disableOptionsOpened: UsePlateOptionsProps['disableOptionsOpened'] = () =>
    setOptionsOpened(false)

  return {
    editing,
    optionsOpened,
    setIdInEditing,
    disableEditing,
    setIdInOptionsOpened,
    disableOptionsOpened
  }
}
