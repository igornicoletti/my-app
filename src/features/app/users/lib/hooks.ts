import { generateRandomUser } from '@/features/app/users/lib/generate'
import { createUserSchema, updateUserSchema, type UserSchema } from '@/features/app/users/lib/schemas'
import { createEntityMutationHook } from '@/hooks/use-entity-mutation'
import { createEntityQueryHook } from '@/hooks/use-entity-query'
import { createEntityService } from '@/services/entity-service'

export const users = createEntityService<UserSchema, typeof createUserSchema._input, typeof updateUserSchema._input>(
  'User',
  generateRandomUser,
  createUserSchema,
  updateUserSchema
)

export const useUsers = createEntityQueryHook<UserSchema>({
  queryKey: ['users'],
  service: users,
  seedCount: 50,
  errorTitle: 'user/fetch-error',
})

export const useCreateUser = createEntityMutationHook({
  mutationFn: users.create,
  successToastMessage: 'user/user-add-success',
  errorToastMessage: 'user/user-add-error',
  invalidateQueryKey: ['users'],
})

export const useUpdateUser = createEntityMutationHook({
  mutationFn: users.update,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
  invalidateQueryKey: ['users'],
})

export const useUpdateUsers = createEntityMutationHook({
  mutationFn: users.bulkUpdate,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
  invalidateQueryKey: ['users'],
})

export const useDeleteUser = createEntityMutationHook({
  mutationFn: users.delete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
  invalidateQueryKey: ['users'],
})

export const useDeleteUsers = createEntityMutationHook({
  mutationFn: users.bulkDelete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
  invalidateQueryKey: ['users'],
})
