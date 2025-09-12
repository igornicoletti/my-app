import type { UserSchema } from '@/features/app/users/lib/schemas'
import { usersService } from '@/features/app/users/lib/services'
import { createEntityMutationHook } from '@/hooks/use-entity-mutation'
import { createEntityQueryHook } from '@/hooks/use-entity-query'

export const useUsers = createEntityQueryHook<UserSchema>({
  queryKey: ['users'],
  service: usersService,
  seedCount: 50,
  errorTitle: 'Failed to fetch users',
})

export const useCreateUser = createEntityMutationHook({
  mutationFn: usersService.create,
  successToastMessage: 'user/user-add-success',
  errorToastMessage: 'user/user-add-error',
  invalidateQueryKey: ['users'],
})

export const useUpdateUser = createEntityMutationHook({
  mutationFn: usersService.update,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
  invalidateQueryKey: ['users'],
})

export const useUpdateUsers = createEntityMutationHook({
  mutationFn: usersService.bulkUpdate,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
  invalidateQueryKey: ['users'],
})

export const useDeleteUser = createEntityMutationHook({
  mutationFn: usersService.delete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
  invalidateQueryKey: ['users'],
})

export const useDeleteUsers = createEntityMutationHook({
  mutationFn: usersService.bulkDelete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
  invalidateQueryKey: ['users'],
})
