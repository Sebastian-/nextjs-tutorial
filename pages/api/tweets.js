import { getRecentTweets } from '@/lib/twitterAPI'

export default async function handler(req, res) {
  const { username } = await req.body
  const data = await getRecentTweets(username)
  res.json(data)
}
