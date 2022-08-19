import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps } from "next";
import { useDarkMode } from "next-dark-mode";
import styles from "./blog-detail.module.scss";
import { getAllBlogPosts, getSingleBlogPost } from "~/utils/mdx/blog.mdx";
import Head from "~/components/template/head";
import { BlogFrontmatter } from "~/utils/mdx/mdx-types";
import MdxImage from "~/components/atomic/mdx-image/mdx-image";
import { clsx } from "~/helpers/classname-helper";

interface BlogDetailProps {
  code: string;
  frontmatter: BlogFrontmatter;
}

const BlogDetail = ({ code, frontmatter }: BlogDetailProps) => {
  const { darkModeActive } = useDarkMode();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head desc={frontmatter.description} title={frontmatter.title} />
      <div className={clsx([styles.wrapper, darkModeActive && styles.dark])}>
        <Component components={{ img: MdxImage }} />
      </div>
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
