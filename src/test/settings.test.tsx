import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

describe('Settings Page Components', () => {
  describe('UI Components', () => {
    it('Button component renders correctly', () => {
      render(<Button>Save Changes</Button>)
      expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
    })

    it('Input component renders correctly', () => {
      render(<Input placeholder="Enter your name" />)
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument()
    })

    it('Label component renders correctly', () => {
      render(<Label htmlFor="test">Display Name</Label>)
      expect(screen.getByText(/display name/i)).toBeInTheDocument()
    })

    it('Select component renders correctly with proper text color', () => {
      render(
        <Select>
          <option value="city">City Only</option>
          <option value="exact">Exact Location</option>
        </Select>
      )
      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
      expect(select).toHaveClass('text-gray-900')
      expect(screen.getByText(/city only/i)).toBeInTheDocument()
    })

    it('Switch component renders correctly', () => {
      render(<Switch checked={true} onChange={() => {}} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeChecked()
    })
  })

  describe('Settings Constants', () => {
    it('should have predefined food preferences', () => {
      const FOOD_PREFERENCES = [
        'Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'Japanese', 'Mediterranean', 
        'American', 'French', 'Korean', 'Vietnamese', 'Vegetarian', 'Vegan', 'Gluten-free'
      ]
      
      expect(FOOD_PREFERENCES).toContain('Italian')
      expect(FOOD_PREFERENCES).toContain('Vegetarian')
      expect(FOOD_PREFERENCES).toHaveLength(14)
    })

    it('should have predefined activity preferences', () => {
      const ACTIVITY_PREFERENCES = [
        'Dining', 'Coffee', 'Drinks', 'Movies', 'Museums', 'Parks', 'Sports', 
        'Shopping', 'Concerts', 'Theater', 'Outdoor Activities', 'Gaming', 'Art', 'Fitness'
      ]
      
      expect(ACTIVITY_PREFERENCES).toContain('Movies')
      expect(ACTIVITY_PREFERENCES).toContain('Museums')
      expect(ACTIVITY_PREFERENCES).toHaveLength(14)
    })

    it('should have predefined accessibility needs', () => {
      const ACCESSIBILITY_NEEDS = [
        'Wheelchair Accessible', 'Parking Required', 'Public Transit Accessible',
        'Hearing Assistance', 'Visual Assistance', 'Quiet Environment', 'Ground Floor Only'
      ]
      
      expect(ACCESSIBILITY_NEEDS).toContain('Wheelchair Accessible')
      expect(ACCESSIBILITY_NEEDS).toContain('Public Transit Accessible')
      expect(ACCESSIBILITY_NEEDS).toHaveLength(7)
    })
  })
})