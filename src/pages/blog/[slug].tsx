import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps } from "next";
import { getAllBlogPosts, getSingleBlogPost } from "~/utils/mdx/blog.mdx";
import Head from "~/components/template/head";
import { BlogFrontmatter } from "~/utils/mdx/mdx-types";

interface BlogDetailProps {
  code: string;
  frontmatter: BlogFrontmatter;
}

const BlogDetail = ({ code, frontmatter }: BlogDetailProps) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head desc={frontmatter.description} title={frontmatter.title} />
      <Component />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const { frontmatter, code } = await getSingleBlogPost(params.slug as string);
  return {
    props: { code, frontmatter },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllBlogPosts().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;
