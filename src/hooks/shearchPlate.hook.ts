import { useEffect, useState } from 'react'
import { type UseSearchUnfocus } from '@/hooks/searchUnfocus'
import { type Plate } from '@/types/server'

interface UseSearchPlate {
  searching: string
  shearchResults: Plate[]
  panelStatus: PanelStatus
  openPanel: () => void
  closePanel: () => void
  onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
}

type PanelStatus = 'open' | 'close'

export const useSearchPlate = (
  plates: Plate[],
  searchUnfocus: UseSearchUnfocus['searchUnfocus'],
  searchUnfocusTunOff: UseSearchUnfocus['searchUnfocusTunOff']
): UseSearchPlate => {
  const [searching, setSearching] = useState('')
  const [shearchResults, setSearchingResult] = useState<Plate[]>([])
  const [panelStatus, setPanelStatus] = useState<PanelStatus>('close')

  const onTyping: UseSearchPlate['onTyping'] = e => {
    const { value } = e.currentTarget
    if (value.length === 0 && panelStatus !== 'close') {
      setSearching('')
      setPanelStatus('close')
    } else if (value.length > 0) {
      const preSearchingResult = plates.filter(plate => {
        return plate.name.toLowerCase().includes(value.toLowerCase())
      })
      setSearching(value)
      setPanelStatus('open')
      setSearchingResult(preSearchingResult)
    }
  }

  const openPanel = (): void => setPanelStatus('open')
  const closePanel = (): void => setPanelStatus('close')

  const handleFocus = (): void => {
    searching.length > 0 && openPanel()
    searchUnfocusTunOff()
  }

  useEffect(() => {
    const preSearchingResult = plates.filter(plate => {
      return plate.name.toLowerCase().includes(searching.toLowerCase())
    })
    setSearchingResult(preSearchingResult)
  }, [plates])

  useEffect(() => {
    if (searchUnfocus) closePanel()
  }, [searchUnfocus])

  return { searching, shearchResults, panelStatus, openPanel, closePanel, onTyping, handleFocus }
}
