import { connect, connection } from 'mongoose'

const dbName = process.env.DBNAME
const uri = `${process.env.DBURI}${dbName}${process.env.DBOPTIONS}`

export const connectDB = async (): Promise<void> => {
  if (connection.readyState === 1) return
  await connect(uri)
}

connection.on('connected', db => {
  console.log(`🔥BBDD (${dbName}) conectada🔥`)
})

connection.on('error', (e: Error) => {
  console.log(`🥵Sucedió un error al conectarse a ${dbName}🥵: ${e.message}`)
})
