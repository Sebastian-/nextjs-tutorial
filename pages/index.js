import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

import Date from '@/components/date'
import Greeting from '@/components/greeting'
import Layout, { siteTitle } from '@/components/layout'
import ViewCount from '@/components/viewCount'
import fetcher from '@/lib/fetchJSON'
import NanaimoWeather from '@/components/nanaimoWeather'
import { getSortedPostsData } from '@/lib/posts'
import utilStyles from '@/styles/utils.module.css'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
      initialZustandState: {
        viewCounts: allPostsData.reduce(
          (counts, { id }) => ({
            ...counts,
            [id]: 0,
          }),
          {}
        ),
      },
    },
  }
}

export default function Home({ allPostsData }) {
  useEffect(() => {
    const fetchWeatherTweet = async () => {
      const NANAIMO_WEATHER_USERNAME = 'wc_nanaimo'
      try {
        const tweets = await fetcher('/api/tweets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: NANAIMO_WEATHER_USERNAME }),
        })
        console.log(tweets)
      } catch (e) {
        // request failed
        console.log(e)
      }
    }
    //fetchWeatherTweet()
  }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          <Greeting /> Welcome to my rendition of the nextjs tutorial 🎉
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>
          Current Conditions at the Nanaimo Office
        </h2>
        <NanaimoWeather />
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} /> <ViewCount postId={id} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
