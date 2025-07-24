import type { z } from 'zod'

import type { userSchema } from '@/features/app/user/data'

export type UserSchema = z.infer<typeof userSchema>
