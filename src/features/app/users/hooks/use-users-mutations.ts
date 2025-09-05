import { useMutation, useQueryClient, type MutationFunction } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import { usersService } from '@/services/users-service'

type UserMutationOptions<TData, TVariables> = {
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
}

interface CreateUserMutationParams<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>
  successToastMessage: string
  errorToastMessage: string
  invalidateQueryKey?: string[]
}

const createUserMutation = <TData = unknown, TVariables = void>({
  mutationFn,
  successToastMessage,
  errorToastMessage,
  invalidateQueryKey = ['users'],
}: CreateUserMutationParams<TData, TVariables>) => {
  return (options?: UserMutationOptions<TData, TVariables>) => {
    const { successToast, errorToast } = useToast()
    const queryClient = useQueryClient()

    return useMutation<TData, Error, TVariables>({
      mutationFn,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
        successToast(successToastMessage)
        options?.onSuccess?.(data, variables, context)
      },
      onError: (error) => {
        console.error(error.message)
        errorToast(errorToastMessage)
      },
    })
  }
}

export const useCreateUser = createUserMutation({
  mutationFn: usersService.create,
  successToastMessage: 'user/user-add-success',
  errorToastMessage: 'user/user-add-error',
})

export const useUpdateUser = createUserMutation({
  mutationFn: usersService.update,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
})

export const useUpdateUsers = createUserMutation({
  mutationFn: usersService.bulkUpdate,
  successToastMessage: 'user/user-update-success',
  errorToastMessage: 'user/user-update-error',
})

export const useDeleteUser = createUserMutation({
  mutationFn: usersService.delete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
})

export const useDeleteUsers = createUserMutation({
  mutationFn: usersService.bulkDelete,
  successToastMessage: 'user/user-delete-success',
  errorToastMessage: 'user/user-delete-error',
})
