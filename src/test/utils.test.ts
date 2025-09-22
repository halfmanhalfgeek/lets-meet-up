import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-4 py-2', 'bg-blue-500', 'text-white')
      expect(result).toBe('px-4 py-2 bg-blue-500 text-white')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class', !isActive && 'inactive-class')
      expect(result).toBe('base-class active-class')
    })

    it('should merge conflicting tailwind classes properly', () => {
      const result = cn('p-4 px-6')
      expect(result).toBe('p-4 px-6')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'other')
      expect(result).toBe('base other')
    })
  })
})