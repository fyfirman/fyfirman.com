import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps } from "next";
import { getAllPosts, getSinglePost } from "~/utils/mdx";

interface BlogDetailProps {
  code: string;
}

const BlogDetail = ({ code }: BlogDetailProps) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div>
      <Component />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }

  const { frontmatter, code } = await getSinglePost(params.slug as string);
  return {
    props: { code, frontmatter },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;
