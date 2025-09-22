'use client'

import { useAuth } from '@/contexts/auth-context'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Users, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.user_metadata?.name || user.email}!
          </h1>
          <p className="text-gray-600">
            Ready to coordinate your next meetup? Let&apos;s get started.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Create Event</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="mb-4">
                Start planning a new meetup with your group
              </CardDescription>
              <Button className="w-full" size="sm">
                New Event
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Create Group</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="mb-4">
                Set up a new group for regular meetups
              </CardDescription>
              <Button variant="outline" className="w-full" size="sm">
                New Group
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Join Group</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="mb-4">
                Have an invite link? Join a private group
              </CardDescription>
              <Button variant="outline" className="w-full" size="sm">
                Enter Invite Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Your upcoming and recent meetups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No events yet</p>
                  <p className="text-sm">Create your first event to get started!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Groups</CardTitle>
              <CardDescription>
                Groups you&apos;re a member of
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No groups yet</p>
                  <p className="text-sm">Create a group or ask a friend for an invite code!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}