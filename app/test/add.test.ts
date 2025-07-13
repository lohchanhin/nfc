import { describe, it, expect } from 'vitest'
import { add } from '../utils/add'

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
