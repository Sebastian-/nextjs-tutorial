import Link from 'next/link'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetchJSON'
import utilStyles from '@/styles/utils.module.css'

import FormattedDate from './date'

const fetchNanaimoWeatherTweets = async (endpoint) => {
  const username = 'wc_nanaimo'
  const fields = ['created_at']

  try {
    const tweets = await fetcher(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, fields }),
    })
    return tweets
  } catch (e) {
    console.log(e)
    return e
  }
}

const parseTweet = (tweet) => {
  const { created_at: createdAt, text } = tweet
  // sample tweet:
  // 'Wed 11:00: Partly Cloudy; Temp 19.5 C; Wind NE 12 km/h; Humidity 50%; Press 101.9 kPa / rising. https://t.co/PVV6zCT1Gq'
  // sky/temp/humidity/pressure are not guaranteed to be present in every tweet

  const data = { temp: '', wind: '', humidity: '' }
  for (let section of text.split(';')) {
    if (section.includes('Temp')) {
      data.temp = section.split(' ')[2]
      continue
    }
    if (section.includes('Wind')) {
      data.wind = section.substr(section.indexOf('Wind') + 5)
      continue
    }
    if (section.includes('Humidity')) {
      data.humidity = section.split(' ')[2]
    }
  }

  return { ...data, createdAt }
}

export default function NanaimoWeather() {
  const { data: tweets, error } = useSWR(
    '/api/tweets',
    fetchNanaimoWeatherTweets
  )

  if (error) {
    return (
      <div>
        <p>There was a problem fetching the weather :(</p>
      </div>
    )
  }

  if (!tweets) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  const { temp, wind, humidity, createdAt } = parseTweet(tweets.data[0])

  return (
    <div>
      <ul className={utilStyles.list}>
        {temp ? <li>🌡️ {`Temperature: ${temp} C°`}</li> : null}
        {wind ? <li>🌫 {`Wind: ${wind}`}</li> : null}
        {humidity ? <li>💧 {`Humidity: ${humidity}`}</li> : null}
      </ul>
      <small className={utilStyles.lightText}>
        Last Updated:{' '}
        <FormattedDate dateString={createdAt} formatString='p LLL d' />{' '}
        <Link href='https://twitter.com/wc_nanaimo'>
          <a target='_blank'>@wc_nanaimo</a>
        </Link>
      </small>
    </div>
  )
}
