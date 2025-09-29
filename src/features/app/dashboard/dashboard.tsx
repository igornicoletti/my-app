import { useEffect, useState } from 'react'

type ColorItem = {
  name: string
  value: string
}

export const AppDashboard = () => {
  const [lightColors, setLightColors] = useState<ColorItem[]>([])
  const [darkColors, setDarkColors] = useState<ColorItem[]>([])

  useEffect(() => {
    const getCSSVariables = (theme: 'light' | 'dark') => {
      const styleSheets = Array.from(document.styleSheets)
      const vars: ColorItem[] = []

      styleSheets.forEach(sheet => {
        try {
          const rules = sheet.cssRules || []
          Array.from(rules).forEach(rule => {
            const selector = (rule as CSSStyleRule).selectorText || ''
            const cssText = (rule as CSSStyleRule).style || null

            if (
              (theme === 'light' && selector === ':root') ||
              (theme === 'dark' && selector === '.dark')
            ) {
              Array.from(cssText).forEach(name => {
                if (name.startsWith('--')) {
                  vars.push({
                    name: name.replace('--', ''),
                    value: cssText.getPropertyValue(name).trim()
                  })
                }
              })
            }
          })
        } catch (e) {
          // Ignora erros de CORS
        }
      })

      return vars
    }

    setLightColors(getCSSVariables('light'))
    setDarkColors(getCSSVariables('dark'))
  }, [])

  const renderColors = (colors: ColorItem[]) => (
    <div className='flex flex-wrap gap-6'>
      {colors.map(({ name, value }) => (
        <div key={name} className='flex flex-col items-center'>
          <div
            className='w-32 h-16 rounded shadow'
            style={{ backgroundColor: value }}
          />
          <span className='text-xs mt-2'>{name}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Paleta de Cores</h2>

      <div>
        <h3 className='text-lg font-semibold mb-2'>Dark Theme</h3>
        {darkColors.length > 0 ? renderColors(darkColors) : <p>Carregando...</p>}
      </div>

      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-2'>Light Theme</h3>
        {lightColors.length > 0 ? renderColors(lightColors) : <p>Carregando...</p>}
      </div>

    </div>
  )
}
