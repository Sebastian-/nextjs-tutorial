import Link from 'next/link'
import { useRouter } from 'next/router'

import fetchJSON from '@/lib/fetchJSON'
import useUser from '@/lib/useUser'

export default function AuthLink() {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  const isAuthPage = router.pathname.includes('/login', '/register')

  if (isAuthPage) return null

  return !user?.isLoggedIn ? (
    <Link href='/login'>
      <a>Log In</a>
    </Link>
  ) : (
    <Link href='/api/logout'>
      <a
        onClick={async (e) => {
          e.preventDefault()
          mutateUser(await fetchJSON('/api/logout', { method: 'POST' }), false)
          router.push('/')
        }}
      >
        Logout
      </a>
    </Link>
  )
}
