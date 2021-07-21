const API_BASEPATH = 'https://api.twitter.com/2/'
const BEARER_TOKEN = 'Bearer ' + process.env.TWITTER_BEARER_TOKEN

/*
username: string - twitter username
fields: [string] - tweet.field options (https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent)
*/
export async function getRecentTweets(username, fields) {
  const URI = encodeURI(
    API_BASEPATH +
      'tweets/search/recent?query=' +
      `from:${username}` +
      `&tweet.fields=${fields.join(',')}`
  )

  try {
    const response = await fetch(URI, {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    })
    const data = await response.json()

    if (response.ok) {
      return data
    }

    const error = new Error(response.statusText)
    error.response = response
    error.data = data
    throw error
  } catch (err) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}
