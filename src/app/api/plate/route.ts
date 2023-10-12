import { NextResponse } from 'next/server'
import Plate from '@/models/Plate'
import { connectDB } from '@/utils/dbconnect'
import { azConnection, createBlobName, uploadBlob } from '@/utils/az-blob'
import type { Plate as TPlate } from '@/types/types'

export async function POST(req: Request): Promise<NextResponse | undefined> {
  try {
    await connectDB()
    const body = await req.formData()
    const name = body.get('name') as unknown as string
    const file = body.get('image') as unknown as File
    const order = body.get('order') as unknown as TPlate['order']
    console.log(order)

    const blobName = createBlobName('plates/', file.name)
    const plate = new Plate<TPlate>({
      name,
      image: blobName,
      order
    })
    await plate.save()

    azConnection()

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const succesUpload = await uploadBlob(blobName, buffer)
    if (succesUpload === true) console.log('Imagen subida correctamente')

    return NextResponse.json({ message: 'todo ok' })
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
      return new NextResponse(e.message)
    }
  }
}

export async function GET(req: Request): Promise<NextResponse | undefined> {
  try {
    azConnection()
    const plates = await Plate.find({})
    return NextResponse.json({ plates })
  } catch (e) {
    if (e instanceof Error) {
      return new NextResponse(e.message)
    }
  }
}
