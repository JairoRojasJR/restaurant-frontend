import { useState } from 'react'

export interface UseSearchUnfocus {
  searchUnfocus: boolean
  searchUnfocusTunOn: () => void
  searchUnfocusTunOff: () => void
}

export const useSearchUnfocus = (): UseSearchUnfocus => {
  const [searchUnfocus, setSearchUnfocus] = useState<UseSearchUnfocus['searchUnfocus']>(true)
  const searchUnfocusTunOn: UseSearchUnfocus['searchUnfocusTunOn'] = () => setSearchUnfocus(true)
  const searchUnfocusTunOff: UseSearchUnfocus['searchUnfocusTunOff'] = () => setSearchUnfocus(false)
  return { searchUnfocus, searchUnfocusTunOn, searchUnfocusTunOff }
}
