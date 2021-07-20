import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

import Date from '@/components/date'
import Greeting from '@/components/greeting'
import Layout, { siteTitle } from '@/components/layout'
import ViewCount from '@/components/viewCount'
import { getSortedPostsData } from '@/lib/posts'
import { getRecentTweets } from '@/lib/twitterAPI'
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
    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/tweets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'wc_nanaimo' }),
        })
        const body = await response.json()
      } catch (e) {
        // request failed
        console.log(e)
      }
    }
    fetchTweets()
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
