import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient, type MutationFunction } from '@tanstack/react-query'

type MutationOptions<TData, TVariables> = {
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
}

interface EntityMutationParams<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>
  successToastMessage: string
  errorToastMessage: string
  invalidateQueryKey: string[]
}

export const createEntityMutationHook = <TData = unknown, TVariables = void>({
  mutationFn,
  successToastMessage,
  errorToastMessage,
  invalidateQueryKey,
}: EntityMutationParams<TData, TVariables>) => {
  return (options?: MutationOptions<TData, TVariables>) => {
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
