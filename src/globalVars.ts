export const BACKEND = process.env.NEXT_PUBLIC_BACKEND
if (BACKEND === undefined) throw new Error('Falta la variable BACKEND')

export const BACKEND_API = `${BACKEND}/api`
export const BACKEND_STREAMING = `${BACKEND_API}/streaming/`
export const BACKEND_STREAMING_IMAGE = `${BACKEND_STREAMING}/image`
