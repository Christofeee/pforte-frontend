"use client"

import About from '@/components/about'
import { useRouter } from 'next/navigation'

export default function Init({ session }) {

  const router = useRouter()

  if (session && session.roles?.includes("admin")) {
    router.push('/admin')
  }
  if (session && session.roles?.includes("teacher")) {
    router.push('/teacher')
  }
  if (session && session.roles?.includes("student")) {
    router.push('/student')
  }
  return <About />
}