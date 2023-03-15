import type { GetStaticProps, NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import styles from "~/styles/Blog.module.scss";
import { BlogPost, getAllBlogPosts } from "~/utils/mdx/blog.mdx";
import BlogCard from "~/components/atomic/blog-card";

interface BlogListProps {
  blogList: BlogPost[];
}

const BlogList: NextPage<BlogListProps> = ({ blogList }) => {
  return (
    <>
      <Head title="Blog" />

      <div className={styles.headingContainer}>
        <h1 className={styles.headings}>Blog - What&apos;s inside fyfirman</h1>
        <p className={styles.subtitle}>
          ⚠️ This page is under development. <br /> Just to put everything in my mind, will tidy up later
        </p>
      </div>
      <div className={styles.cardContainer}>
        {blogList.map(({ title, publishedAt, slug, readingTime, coverImage }) => (
          <BlogCard
            key={slug}
            href={`/blog/${slug}`}
            imageURI={require(`../assets/images/blog-cover/${coverImage}`) as StaticImageData}
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
