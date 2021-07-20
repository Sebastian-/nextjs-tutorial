const API_BASEPATH = 'https://api.twitter.com/2/'
const BEARER_TOKEN = 'Bearer ' + process.env.TWITTER_BEARER_TOKEN

export async function getRecentTweets(username) {
  const URI = API_BASEPATH + 'tweets/search/recent?query=from:' + username
  try {
    const response = await fetch(URI, {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    })
    const json = await response.json()
    console.log(json)
    return json
  } catch (err) {
    console.log(err)
  }
}
