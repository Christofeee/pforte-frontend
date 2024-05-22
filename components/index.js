"use client"

import { useRouter } from 'next/navigation'

export default function Index({ session }) {

  const router = useRouter()

  if (session && session.roles?.includes("admin")) {
    router.push('/admin')
  } else if (session && session.roles?.includes("teacher")) {
    router.push('/teacher')
  } else if (session && session.roles?.includes("student")) {
    router.push('/student')
  }
  return <h1>not logged in. Index</h1>
}