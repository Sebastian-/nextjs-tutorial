import Head from 'next/head'
import { useEffect } from 'react'

import FormattedDate from '@/components/date'
import Layout from '@/components/layout'
import ViewCount from '@/components/viewCount'
import { getAllPostIds, getPostData } from '@/lib/posts'
import { useStore } from '@/lib/store'
import utilStyles from '@/styles/utils.module.css'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export default function Post({ postData }) {
  const { increment } = useStore((store) => ({
    increment: store.incrementViewCount,
  }))

  useEffect(() => {
    increment(postData.id)
  }, [increment, postData.id])

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <FormattedDate dateString={postData.date} />{' '}
          <ViewCount postId={postData.id} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
