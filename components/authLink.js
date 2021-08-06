import Link from 'next/link'
import { useRouter } from 'next/router'

import { useStore } from '@/lib/store'

export default function AuthLink() {
  const [isLoggedIn, setIsLoggedIn] = useStore((state) => [
    state.isLoggedIn,
    state.setIsLoggedIn,
  ])
  const router = useRouter()
  const isAuthPage = router.pathname.includes('/login', '/register')

  if (isAuthPage) return null

  return !isLoggedIn ? (
    <Link href='/login'>
      <a>Log In</a>
    </Link>
  ) : (
    <Link href='/'>
      <a
        onClick={async (e) => {
          e.preventDefault()
          localStorage.removeItem('authToken')
          setIsLoggedIn(false)
          router.push('/')
        }}
      >
        Log Out
      </a>
    </Link>
  )
}
