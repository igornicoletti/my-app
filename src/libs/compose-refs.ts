import { useCallback, type Ref, type RefCallback } from 'react'

type PossibleRef<T> = Ref<T> | undefined

const setRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === 'function') {
    return ref(value)
  }

  if (ref !== null && ref !== undefined) {
    ref.current = value
  }
}

const composeRefs = <T>(...refs: PossibleRef<T>[]): RefCallback<T> => {
  return (node) => {
    let hasCleanup = false
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node)
      if (!hasCleanup && typeof cleanup === 'function') {
        hasCleanup = true
      }
      return cleanup
    })

    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i]
          if (typeof cleanup === 'function') {
            cleanup()
          } else {
            setRef(refs[i], null)
          }
        }
      }
    }
  }
}

export const useComposedRefs = <T>(...refs: PossibleRef<T>[]): RefCallback<T> => {
  return useCallback(composeRefs(...refs), refs)
}
