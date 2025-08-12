import { describe, expect, it } from 'vitest'

import { loginSchema } from '@/features/auth/data'

describe('loginSchema', () => {
  it('should pass with valid data', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'securePassword123'
    })
    expect(result.success).toBe(true)
  })

  it('should fail with invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: '123456'
    })
    expect(result.success).toBe(false)
  })

  it('should fail if password is missing', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com'
    })
    expect(result.success).toBe(false)
  })
})
