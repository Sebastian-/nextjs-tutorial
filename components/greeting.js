import useUser from '@/lib/useUser'

export default function Greeting() {
  const { user } = useUser()

  return user?.isLoggedIn ? (
    <span>{`Hi ${user.username}!`}</span>
  ) : (
    <span>Hi there!</span>
  )
}
