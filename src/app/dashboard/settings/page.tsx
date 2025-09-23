'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { MapPin, Bell, Shield, Heart, Activity } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
// Types are inferred from Supabase client

// Predefined options for interests
const FOOD_PREFERENCES = [
  'Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'Japanese', 'Mediterranean', 
  'American', 'French', 'Korean', 'Vietnamese', 'Vegetarian', 'Vegan', 'Gluten-free'
]

const ACTIVITY_PREFERENCES = [
  'Dining', 'Coffee', 'Drinks', 'Movies', 'Museums', 'Parks', 'Sports', 
  'Shopping', 'Concerts', 'Theater', 'Outdoor Activities', 'Gaming', 'Art', 'Fitness'
]

const ACCESSIBILITY_NEEDS = [
  'Wheelchair Accessible', 'Parking Required', 'Public Transit Accessible',
  'Hearing Assistance', 'Visual Assistance', 'Quiet Environment', 'Ground Floor Only'
]

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const supabase = createClient()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    defaultLocation: '',
    foodPreferences: [] as string[],
    activityPreferences: [] as string[],
    accessibilityNeeds: [] as string[],
    notificationPreferences: {
      email: true,
      push: true,
      frequency: 'immediate' as 'immediate' | 'daily' | 'weekly'
    },
    privacySettings: {
      location_sharing: 'city' as 'exact' | 'city' | 'none',
      calendar_visibility: 'availability' as 'full' | 'availability' | 'none'
    }
  })

  useEffect(() => {
    if (user && !loading) {
      loadUserData()
    }
  }, [user, loading]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserData = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      
      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      // Load user preferences
      const { data: prefs, error: prefsError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (prefsError && prefsError.code !== 'PGRST116') {
        throw prefsError
      }

      // Store loaded data locally for potential future use

      // Update form data with loaded values
      setFormData({
        name: profile?.name || user.user_metadata?.name || '',
        defaultLocation: profile?.default_location || '',
        foodPreferences: prefs?.food_preferences || [],
        activityPreferences: prefs?.activity_preferences || [],
        accessibilityNeeds: prefs?.accessibility_needs || [],
        notificationPreferences: prefs?.notification_preferences || {
          email: true,
          push: true,
          frequency: 'immediate'
        },
        privacySettings: prefs?.privacy_settings || {
          location_sharing: 'city',
          calendar_visibility: 'availability'
        }
      })
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return

    try {
      setIsSaving(true)

      // Update user profile
      const { error: profileError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email!,
          name: formData.name,
          default_location: formData.defaultLocation,
        })

      if (profileError) throw profileError

      // Update user preferences
      const { error: prefsError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          food_preferences: formData.foodPreferences,
          activity_preferences: formData.activityPreferences,
          accessibility_needs: formData.accessibilityNeeds,
          notification_preferences: formData.notificationPreferences,
          privacy_settings: formData.privacySettings,
        })

      if (prefsError) throw prefsError

      // Reload data to confirm changes
      await loadUserData()
      
      // Show success message (you might want to add a toast notification here)
      console.log('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      // Show error message (you might want to add a toast notification here)
    } finally {
      setIsSaving(false)
    }
  }

  const togglePreference = (category: 'food' | 'activity' | 'accessibility', value: string) => {
    const key = `${category}Preferences` as keyof typeof formData
    const currentPrefs = formData[key] as string[]
    
    if (currentPrefs.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [key]: currentPrefs.filter(item => item !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [key]: [...currentPrefs, value]
      }))
    }
  }

  if (loading || isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-900">Loading settings...</div>
        </div>
      </MainLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your profile, preferences, and privacy settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile & Location */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <CardTitle>Profile & Location</CardTitle>
              </div>
              <CardDescription>
                Update your basic profile information and home location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your display name"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Home Location</Label>
                <Input
                  id="location"
                  value={formData.defaultLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, defaultLocation: e.target.value }))}
                  placeholder="City, State or Address"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Used for calculating fair meetup locations
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <CardTitle>Privacy</CardTitle>
              </div>
              <CardDescription>
                Control how your information is shared with groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="locationSharing">Location Sharing</Label>
                <Select 
                  id="locationSharing"
                  value={formData.privacySettings.location_sharing}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    privacySettings: {
                      ...prev.privacySettings,
                      location_sharing: e.target.value as 'exact' | 'city' | 'none'
                    }
                  }))}
                >
                  <option value="exact" className="text-gray-900">Exact Location</option>
                  <option value="city" className="text-gray-900">City Only</option>
                  <option value="none" className="text-gray-900">Hidden</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="calendarVisibility">Calendar Visibility</Label>
                <Select 
                  id="calendarVisibility"
                  value={formData.privacySettings.calendar_visibility}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    privacySettings: {
                      ...prev.privacySettings,
                      calendar_visibility: e.target.value as 'full' | 'availability' | 'none'
                    }
                  }))}
                >
                  <option value="full" className="text-gray-900">Full Calendar</option>
                  <option value="availability" className="text-gray-900">Availability Only</option>
                  <option value="none" className="text-gray-900">Private</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Choose how you want to be notified about meetup updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Get updates via email</p>
                </div>
                <Switch
                  checked={formData.notificationPreferences.email}
                  onChange={(checked) => setFormData(prev => ({
                    ...prev,
                    notificationPreferences: {
                      ...prev.notificationPreferences,
                      email: checked
                    }
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Get real-time alerts</p>
                </div>
                <Switch
                  checked={formData.notificationPreferences.push}
                  onChange={(checked) => setFormData(prev => ({
                    ...prev,
                    notificationPreferences: {
                      ...prev.notificationPreferences,
                      push: checked
                    }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="frequency">Notification Frequency</Label>
                <Select 
                  id="frequency"
                  value={formData.notificationPreferences.frequency}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notificationPreferences: {
                      ...prev.notificationPreferences,
                      frequency: e.target.value as 'immediate' | 'daily' | 'weekly'
                    }
                  }))}
                >
                  <option value="immediate" className="text-gray-900">Immediate</option>
                  <option value="daily" className="text-gray-900">Daily Digest</option>
                  <option value="weekly" className="text-gray-900">Weekly Summary</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Food Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-600" />
                <CardTitle>Food Preferences</CardTitle>
              </div>
              <CardDescription>
                Help us suggest restaurants that match your taste
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {FOOD_PREFERENCES.map((food) => (
                  <label key={food} className="flex items-center space-x-2 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={formData.foodPreferences.includes(food)}
                      onChange={() => togglePreference('food', food)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{food}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <CardTitle>Activity Preferences</CardTitle>
              </div>
              <CardDescription>
                What types of activities do you enjoy?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {ACTIVITY_PREFERENCES.map((activity) => (
                  <label key={activity} className="flex items-center space-x-2 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={formData.activityPreferences.includes(activity)}
                      onChange={() => togglePreference('activity', activity)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{activity}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Needs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Accessibility Needs</CardTitle>
              <CardDescription>
                Let us know about any accessibility requirements for venues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ACCESSIBILITY_NEEDS.map((need) => (
                  <label key={need} className="flex items-center space-x-2 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={formData.accessibilityNeeds.includes(need)}
                      onChange={() => togglePreference('accessibility', need)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{need}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            size="lg"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}