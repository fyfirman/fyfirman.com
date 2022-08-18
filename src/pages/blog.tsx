import type { GetStaticProps, NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import styles from "~/styles/Blog.module.scss";
import { BlogPost, getAllBlogPosts } from "~/utils/mdx/mdx";
import BlogCard from "~/components/atomic/blog-card";

interface BlogListProps {
  blogList: BlogPost[];
}

const BlogList: NextPage<BlogListProps> = ({ blogList }) => {
  return (
    <>
      <Head title="Blog" />

      <h1 className={styles.headings}>Blog - What&apos;s inside fyfirman</h1>
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
