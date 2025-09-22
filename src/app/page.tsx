import Link from 'next/link'
import { Calendar, Users, MapPin, Vote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Calendar,
    title: 'Easy Scheduling',
    description: 'Share your availability and find the perfect time for everyone to meet.'
  },
  {
    icon: MapPin,
    title: 'Smart Venues',
    description: 'Get suggestions for meetup locations that are fair and convenient for all.'
  },
  {
    icon: Vote,
    title: 'Quick Voting',
    description: 'Vote on times and places with simple, intuitive controls.'
  },
  {
    icon: Users,
    title: 'Private Groups',
    description: 'Create invite-only groups and manage your close friends and colleagues.'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">
            Let&apos;s Meet Up
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Connect with friends,{' '}
            <span className="text-blue-600">effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop the endless back-and-forth. Let&apos;s Meet Up helps you coordinate
            with friends, find the perfect time and place, and actually make those 
            meetups happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Planning Meetups
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to coordinate
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for busy adults who want to spend less time planning and more time together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to bring your friends together?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of people who&apos;ve made planning meetups simple and stress-free.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-3">
              Create Your First Event
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 md:mb-0">
              Let&apos;s Meet Up
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
