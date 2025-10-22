// src/hooks/useAuth.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/lib/api'

export interface UserProfile {
  id: string
  email: string
  username?: string
  role: string
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/auth/me`)
        console.log('useauth response ==> ', res)
        if (res.status !== 200) throw new Error('Não autenticado')

        const data = res.data
        setUser(data) // assume que API retorna { id, email, role, ... }
      } catch (e) {
        console.log("Error in src/hooks/useAuth.tsx, line 31 ==> ", e);

        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  return { user, loading }
}
