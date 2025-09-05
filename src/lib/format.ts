export const formatDate = (
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {},
): string => {
  if (!date) return ''

  try {
    return new Intl.DateTimeFormat('en-US', {
      day: opts.day ?? 'numeric',
      month: opts.month ?? 'short',
      year: opts.year ?? 'numeric',
      ...opts,
    }).format(new Date(date))
  } catch {
    return ''
  }
}

export const formatPhone = (phone?: string): string => {
  if (!phone) return ''

  const digits = phone.replace(/[^\d+]/g, '')

  if (digits.length < 12) return phone

  const country = digits.slice(0, 3)
  const area = digits.slice(3, 5)
  const first = digits.slice(5, 10)
  const second = digits.slice(10, 14)

  return `${country} (${area}) ${first} ${second}`.trim()
}
