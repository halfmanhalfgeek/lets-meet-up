'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Calendar, Settings, LogOut, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Calendar },
  { name: 'Groups', href: '/groups', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              Let&apos;s Meet Up
            </Link>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
            <div className="flex h-16 flex-shrink-0 items-center px-6 border-b border-gray-200">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                Let&apos;s Meet Up
              </Link>
            </div>
            
            <div className="flex flex-1 flex-col overflow-y-auto pt-6">
              <nav className="flex-1 space-y-1 px-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 h-5 w-5',
                          isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                        )}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              
              <div className="px-6 pb-6">
                <Button className="w-full" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button variant="ghost" className="w-full justify-start text-gray-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:pl-64">
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
                  isActive
                    ? 'text-blue-700'
                    : 'text-gray-600'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 mb-1',
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}