import { z } from 'zod'

// Validation scheme for environment variables
const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, 'Missing FIREBASE_API_KEY'),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'Missing FIREBASE_AUTH_DOMAIN'),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, 'Missing FIREBASE_PROJECT_ID'),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'Missing FIREBASE_STORAGE_BUCKET'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'Missing FIREBASE_MESSAGING_SENDER_ID'),
  VITE_FIREBASE_APP_ID: z.string().min(1, 'Missing FIREBASE_APP_ID'),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().min(1, 'Missing FIREBASE_MEASUREMENT_ID'),
  VITE_APP_ORIGIN: z.string().url('VITE_APP_ORIGIN must be a valid URL'),
})

// Performs validation using import.meta.env
const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:\n',
    JSON.stringify(parsedEnv.error.format(), null, 2)
  )
  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
