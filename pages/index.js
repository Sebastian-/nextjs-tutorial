import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

import FormattedDate from '@/components/date'
import Greeting from '@/components/greeting'
import Layout, { siteTitle } from '@/components/layout'
import NanaimoWeather from '@/components/nanaimoWeather'
import ViewCount from '@/components/viewCount'
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
        <h2 className={utilStyles.headingLg}>Current Conditions in Nanaimo</h2>
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
                <FormattedDate dateString={date} /> <ViewCount postId={id} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
