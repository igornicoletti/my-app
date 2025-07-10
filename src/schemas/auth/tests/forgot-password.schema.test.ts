import { describe, expect, it } from 'vitest'

import { forgotPasswordSchema } from '@/schemas'

describe('forgotPasswordSchema', () => {
  it('should pass with valid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'user@example.com'
    })
    expect(result.success).toBe(true)
  })

  it('should fail with empty email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: ''
    })
    expect(result.success).toBe(false)
  })
})
