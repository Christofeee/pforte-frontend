"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCheck({ session, roleToCheck, children }) {
  const router = useRouter()

  useEffect(() => {
    if (!session || !session.roles?.includes(roleToCheck)) {
      router.push('/unauthorized')
    }
  }, [session, roleToCheck, router])

  if (session && session.roles?.includes(roleToCheck)) {
    return (
      <>
        {children}
      </>
    )
  }

  return null
}
