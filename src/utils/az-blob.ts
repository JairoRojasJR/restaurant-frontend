import { BlobServiceClient, type ContainerClient } from '@azure/storage-blob'

interface AzConnection {
  connected: boolean
  containerClient: ContainerClient | null
}
const azConnectionData: AzConnection = {
  connected: false,
  containerClient: null
}

export const azConnection = (): AzConnection => {
  if (azConnectionData.connected) return azConnectionData

  const azString = process.env.AZ_CONNECTION_STRING
  const blobContainer = process.env.AZ_BLOB_CONTAINER

  try {
    if (azString === undefined) {
      throw new Error('Falta la cadena de conexión')
    }
    if (blobContainer === undefined) {
      throw new Error('Falta el nombre del contenedor')
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(azString)
    const connection = blobServiceClient.getContainerClient(
      `${blobContainer}/images`
    )

    azConnectionData.connected = true
    azConnectionData.containerClient = connection
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }

  return azConnectionData
}

export const createBlobName = (path: string, fullFileName: string): string => {
  const fileNameSplit = fullFileName.split('.')

  const fileName = fileNameSplit[0]
  const blobNameId = '--id--' + crypto.randomUUID()
  const fileExtension = fileNameSplit[1]

  return `${path}${fileName}${blobNameId}.${fileExtension}`
}

export const uploadBlob = async (
  blobName: string,
  buffer: Buffer
): Promise<boolean | undefined> => {
  const { containerClient } = azConnectionData
  if (containerClient !== null) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    await blockBlobClient.upload(buffer, buffer.length)
    return true
  }
  throw new Error('No se encontró la conexión')
}
