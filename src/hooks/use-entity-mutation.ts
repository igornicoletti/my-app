import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient, type MutationFunction } from '@tanstack/react-query'

interface CreateEntityMutationParams<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>
  successToastMessage: string
  errorToastMessage: string
  invalidateQueryKey: string[]
}

export const createEntityMutation = <TData = unknown, TVariables = void>({
  mutationFn,
  successToastMessage,
  errorToastMessage,
  invalidateQueryKey,
}: CreateEntityMutationParams<TData, TVariables>) => {
  return (options?: {
    onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
  }) => {
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
