import {
  useEffect,
  useMemo,
  useRef
} from 'react'

export const useCallbackRef = <T extends (...args: never[]) => unknown>(callback: T | undefined): T => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}
