import { userGenerate } from '@/features/app/user/lib/generate'
import { userSchemaCreate, userSchemaUpdate, type UserSchema } from '@/features/app/user/lib/schema'
import { createEntityMutationHook } from '@/hooks/use-entity-mutation'
import { createEntityQueryHook } from '@/hooks/use-entity-query'
import { ServiceEntity } from '@/services/entity'

export const users = ServiceEntity<UserSchema, typeof userSchemaCreate._input, typeof userSchemaUpdate._input>(
  'User',
  userGenerate,
  userSchemaCreate,
  userSchemaUpdate
)

export const useUser = createEntityQueryHook<UserSchema>({
  queryKey: ['users'],
  service: users,
  seedCount: 50,
  errorTitle: 'user/fetch-error',
})

export const useUserCreate = createEntityMutationHook({
  mutationFn: users.create,
  successToastMessage: 'user/user-add-success',
  errorToastMessage: 'user/user-add-error',
  invalidateQueryKey: ['users'],
})

export const useUserUpdate = createEntityMutationHook({
  mutationFn: users.update,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
  invalidateQueryKey: ['users'],
})

export const useUserUpdates = createEntityMutationHook({
  mutationFn: users.bulkUpdate,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
  invalidateQueryKey: ['users'],
})

export const useUserDelete = createEntityMutationHook({
  mutationFn: users.bulkDelete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
  invalidateQueryKey: ['users'],
})
