import { useEffect, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps } from "next";
import { useDarkMode } from "next-dark-mode";
import { getAllBlogPosts, getSingleBlogPost } from "~/utils/mdx/blog.mdx";
import Head from "~/components/template/head";
import { BlogFrontmatter } from "~/utils/mdx/mdx-types";
import MdxImage from "~/components/atomic/mdx-image/mdx-image";
import { clsx } from "~/helpers/classname-helper";
import BlogHeader from "~/components/atomic/blog-header/blog-header";
import Youtube from "~/components/atomic/youtube/youtube";
import BlogServices from "~/services/blog.services";
import styles from "./blog-detail.module.scss";

interface BlogDetailProps {
  code: string;
  slug: string;
  frontmatter: BlogFrontmatter;
}

const BlogDetail = ({ code, frontmatter, slug }: BlogDetailProps) => {
  const { darkModeActive } = useDarkMode();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  useEffect(() => {
    void BlogServices.postRead(slug);
  }, []);

  return (
    <>
      <Head desc={frontmatter.description} title={frontmatter.title} />
      <div className={clsx([styles.wrapper, darkModeActive && styles.dark])}>
        <BlogHeader
          language={frontmatter.language}
          publishedAt={new Date(frontmatter.publishedAt)}
          readingTime={frontmatter.readingTime}
          title={frontmatter.title}
        />
        <Component components={{ img: MdxImage, MdxImage, Youtube }} />
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
    props: { code, frontmatter, slug: params.slug as string },
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
