import type { GetStaticProps, NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import velocityLeague from "@assets/images/project/velocity-league.jpg";
import styles from "~/styles/Blog.module.scss";
import { getAllBlogPosts } from "~/utils/mdx/mdx";
import { BlogFrontmatter } from "~/utils/mdx/mdx-types";
import BlogCard from "~/components/atomic/blog-card";

interface BlogListProps {
  blogList: {
    frontmatter: BlogFrontmatter;
    slug: string;
  }[];
}

const BlogList: NextPage<BlogListProps> = ({ blogList }) => {
  return (
    <>
      <Head title="Blog" />

      <div className={styles.main}>blog list</div>
      <div className={styles.cardContainer}>
        {blogList.map(({ frontmatter, slug }) => (
          <BlogCard
            key={slug}
            desc={frontmatter.description}
            href={`/blog/${slug}`}
            imageURI={velocityLeague}
            title={frontmatter.title}
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
