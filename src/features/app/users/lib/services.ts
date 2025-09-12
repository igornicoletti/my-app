import { generateRandomUser } from '@/features/app/users/lib/generate'
import type { UserSchema } from '@/features/app/users/lib/schemas'
import { createEntityService } from '@/services/entity-service'

export const usersService = createEntityService<UserSchema>('User', generateRandomUser)
