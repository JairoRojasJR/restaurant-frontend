import axios from 'axios'
import { toast } from 'sonner'
import { type SchemaError, type ResponseSchemaError } from '@/types/server'

export const insertIdInUrl = (_id: string, path: string): string => {
  const params = new URLSearchParams()
  params.append('_id', _id)
  return `${path}?${params.toString()}`
}

export const schemaError = (error: unknown): SchemaError[] | false => {
  if (
    axios.isAxiosError(error) &&
    error.response !== undefined &&
    'name' in error.response.data &&
    error.response.data.name === 'ZodError'
  ) {
    const data = error.response.data as ResponseSchemaError
    return data.errors
  }
  return false
}

export const getErrorMessage = (error: unknown): string => {
  let message: string = 'Error desconocido'
  const thereIsError = error !== undefined && error !== null
  const thereIsMessage = thereIsError && typeof error === 'object' && 'message' in error

  if (axios.isAxiosError(error) && error.response !== undefined && 'error' in error.response.data) {
    const res = error.response.data
    message = res.error
  } else if (error instanceof Error) message = error.message
  else if (thereIsMessage) message = String(error.message)
  else if (typeof error === 'string') message = error
  return message
}

export const toastErrorWhenSendingData = (
  error: unknown,
  elements: Record<string, string>
): void => {
  const errorsFromSchema = schemaError(error)
  let firstToasted = false
  if (errorsFromSchema !== false) {
    errorsFromSchema.forEach(error => {
      const { path } = error
      const inputName = path[path.length - 1]
      const element = elements[inputName]

      let toastMessage: string
      if (element !== undefined) toastMessage = `[${element}] ${error.message}`
      else toastMessage = `[Elemento desconocido] ${error.message}`

      const throwToast = (): string | number => toast(toastMessage)
      if (!firstToasted) {
        throwToast()
        firstToasted = true
      } else setTimeout(() => throwToast(), 500)
    })
  } else toast(getErrorMessage(error))
}

export const splitBySearch = (target: string, search: string): string[] => {
  const nameSplitedBySearching: string[] = []
  let chunkChecking = ''

  for (const letter of target) {
    chunkChecking += letter
    const chunkCheckingUpper = chunkChecking.toUpperCase()
    const searchingUpper = search.toUpperCase()

    if (chunkCheckingUpper.includes(searchingUpper)) {
      const searchingIndexInChunkChecking = chunkCheckingUpper.indexOf(searchingUpper)
      const matchedChunk = chunkChecking.slice(0, searchingIndexInChunkChecking)
      const matchedSearching = chunkChecking.slice(
        searchingIndexInChunkChecking,
        searchingIndexInChunkChecking + searchingUpper.length
      )

      nameSplitedBySearching.push(matchedChunk)
      nameSplitedBySearching.push(matchedSearching)
      chunkChecking = ''
    }
  }

  if (chunkChecking.length > 0) nameSplitedBySearching.push(chunkChecking)
  return nameSplitedBySearching
}
