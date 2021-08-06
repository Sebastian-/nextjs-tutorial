import useUser from '@/lib/useUser'

export default function Greeting() {
  const { user } = useUser()

  return user?.username ? (
    <span>{`Hi ${user.username}!`}</span>
  ) : (
    <span>Hi there!</span>
  )
}
