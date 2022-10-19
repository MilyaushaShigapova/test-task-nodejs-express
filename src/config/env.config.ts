import 'dotenv/config'

export const PORT = Number(process.env.PORT) || 8080

export const MONGO_URI = process.env.MONGO_URI!

export const SESSION_SECRET = process.env.SESSION_SECRET!

const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''

export const redisConfig = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
}