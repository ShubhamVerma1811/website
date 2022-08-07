import { PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getClient } from 'services/sanity-server';

const Uses = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      {props.md && (
        <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary [&>ul>li>p]:my-0'>
          <MDXRemote {...props.md} />
        </div>
      )}
    </PageLayout>
  );
};

export default Uses;

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const uses = await getClient(preview).fetch(`*[_type == "uses"]`);

  if (!uses) {
    return {
      props: {},
      notFound: true
    };
  }

  const md = await serialize(uses[0]?.body || '');

  return {
    props: {
      md
    },
    notFound: false
  };
};
