import { describe, expect, it } from 'vitest'

import { resetPasswordSchema } from '@/features/auth/data'

describe('resetPasswordSchema', () => {
  const validData = {
    password: 'StrongPass1',
    confirmPassword: 'StrongPass1'
  }

  it('should pass with matching passwords', () => {
    const result = resetPasswordSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail if passwords do not match', () => {
    const result = resetPasswordSchema.safeParse({
      ...validData,
      confirmPassword: 'Mismatch1'
    })
    expect(result.success).toBe(false)
  })

  it('should fail if password does not meet complexity', () => {
    const result = resetPasswordSchema.safeParse({
      password: 'weak',
      confirmPassword: 'weak'
    })
    expect(result.success).toBe(false)
  })
})
