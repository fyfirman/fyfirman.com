import type { GetStaticProps, NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import styles from "~/styles/Blog.module.scss";
import { BlogPost, getAllBlogPosts } from "~/utils/mdx/blog.mdx";
import BlogCard from "~/components/atomic/blog-card";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import { ImageProps } from "next/image";
import useResponsive from "~/hooks/useResponsive";
import { useRouter } from "next/router";

interface BlogListProps {
  blogList: BlogPost[];
}

const BlogList: NextPage<BlogListProps> = ({ blogList }) => {
  const { isMobile } = useResponsive();
  const router = useRouter();

  const showHidden = Boolean(router.query.hidden);

  return (
    <>
      <Head title="Blog" />

      <div className={styles.headingContainer}>
        <Heading1>Blog - What&apos;s inside fyfirman</Heading1>
        <Paragraph isMobile={isMobile}>
          ⚠️ This page is under development. <br /> Just to put everything in my mind, will tidy up later
        </Paragraph>
      </div>
      <div className={styles.cardContainer}>
        {blogList
          .filter((b) => !b.hide || showHidden)
          .map(({ title, publishedAt, slug, readingTime, coverImage }) => (
            <BlogCard
              key={slug}
              href={`/blog/${slug}`}
              imageURI={require(`../assets/images/blog-cover/${coverImage}`) as ImageProps["src"]}
              publishedDate={new Date(publishedAt)}
              readingTime={readingTime}
              title={title}
            />
          ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogListProps> = async () => {
  const data = getAllBlogPosts();

  return {
    props: {
      blogList: data,
    },
  };
};

export default React.memo(BlogList);
