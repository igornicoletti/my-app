import { describe, expect, it } from 'vitest'

import { registerSchema } from '@/features/auth/data'

describe('registerSchema', () => {
  const validData = {
    email: 'user@example.com',
    password: 'StrongPass1',
    confirmPassword: 'StrongPass1',
    displayName: 'John Doe'
  }

  it('should pass with valid data', () => {
    const result = registerSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail if passwords do not match', () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: 'DifferentPass'
    })
    expect(result.success).toBe(false)
  })

  it('should fail if password is too weak', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'weak',
      confirmPassword: 'weak'
    })
    expect(result.success).toBe(false)
  })
})
