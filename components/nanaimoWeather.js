import Link from 'next/link'

import utilStyles from '@/styles/utils.module.css'

export default function NanaimoWeather() {
  const { temp, wind, humidity, lastUpdated } = {
    temp: 'Temperature: 18.3 C°',
    wind: 'Wind: NW 13km/h',
    humidity: 'Humidity: 43%',
    lastUpdated: '9:00 July 21',
  }
  return (
    <div>
      <ul className={utilStyles.list}>
        <li>🌡 {temp}</li>
        <li>🌫 {wind}</li>
        <li>💧 {humidity}</li>
      </ul>
      <small className={utilStyles.lightText}>
        Last Updated: {lastUpdated}{' '}
        <Link href='https://twitter.com/wc_nanaimo'>
          <a target='_blank'>@wc_nanaimo</a>
        </Link>
      </small>
    </div>
  )
}
