import { BlogCard } from 'components';
import { PageLayout } from 'layouts';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { memo } from 'react';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const Blog = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout title='Blogs'>
      <Head>
        <title>Blogs | Shubham Verma</title>
        <meta name='description' content='Blogs by Shubham Verma' />
      </Head>

      {blogs?.map((blog, index) => {
        return <BlogCard key={index} blog={blog} />;
      })}
    </PageLayout>
  );
};

export default memo(Blog);

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const blogs: Array<Blog> = await getClient(preview).fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  return {
    props: {
      blogs
    },
    revalidate: 60 * 60 * 24
  };
};
