export const dateTimeFormat = (
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) => {
  if (!date) return ''

  try {
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts,
    }).format(new Date(date))

    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  } catch {
    return ''
  }
}
