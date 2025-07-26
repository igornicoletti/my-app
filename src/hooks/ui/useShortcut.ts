import { useEffect } from 'react'

type ModifierKey = 'ctrl' | 'shift' | 'alt' | 'meta'

const parseCombo = (combo: string) => {
  const parts = combo.toLowerCase().split('+')
  const key = parts.pop() || ''
  const modifiers: ModifierKey[] = parts as ModifierKey[]
  return { key, modifiers }
}

export const useShortcut = (
  combos: string | string[],
  action: () => void
) => {
  useEffect(() => {
    const comboList = Array.isArray(combos) ? combos : [combos]

    const handler = (event: KeyboardEvent) => {
      if (typeof event.key !== 'string') return

      for (const combo of comboList) {
        const { key, modifiers } = parseCombo(combo)
        const pressedKey = event.key.toLowerCase()
        const modifiersMatch =
          (!modifiers.includes('ctrl') || event.ctrlKey) &&
          (!modifiers.includes('shift') || event.shiftKey) &&
          (!modifiers.includes('alt') || event.altKey) &&
          (!modifiers.includes('meta') || event.metaKey)

        if (pressedKey === key && modifiersMatch) {
          event.preventDefault()
          action()
          return
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [combos, action])

  return action
}
