import { azConnection } from '@/utils/az-blob'
import { NextResponse } from 'next/server'
const { containerClient } = azConnection()

export async function GET(
  req: Request,
  { params }: { params: { src: string[] } }
): Promise<Response> {
  const rawPath = params.src
  const path = rawPath.join('/')

  const extension = rawPath[rawPath.length - 1].split('.')[1]
  const contentType = `image/${extension === 'jpg' ? 'jpeg' : extension}`

  try {
    if (containerClient === null) {
      throw new Error('No se encontró el cliente contenedor')
    }
    const blockBlobClient = containerClient.getBlockBlobClient(path)

    const downloadBlockBlobResponse = await blockBlobClient.download(0)
    const readableStream = downloadBlockBlobResponse.readableStreamBody

    if (readableStream === undefined) {
      throw new Error('No se encontró el cliente contenedor')
    }

    const res = new NextResponse(readableStream as unknown as ReadableStream, {
      status: 200,
      headers: new Headers({
        'content-type': contentType
      })
    })

    return res
  } catch (error) {
    let errorMessage
    if (error instanceof Error) errorMessage = error.message
    else errorMessage = error

    const res = new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: 400
    })

    return res
  }
}
