'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { useState, useEffect } from 'react'

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{children}</>
  }

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}