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
import FontToggle from "~/components/atomic/font-toggle/font-toggle";
import Youtube from "~/components/atomic/youtube/youtube";
import EmbedBookmark from "~/components/organism/embed-bookmark";
import CloudinaryPlayer from "~/components/organism/cloudinary-player";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import BlogServices from "~/services/blog.services";
import tracer from "~/utils/tracer/tracer";
import useFontMode from "~/hooks/use-font-mode";
import useFontSize from "~/hooks/use-font-size";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  Paragraph,
  UnorderedList,
} from "~/components/atomic/typography/typography";
import styles from "./blog-detail.module.scss";

interface BlogDetailProps {
  code: string;
  slug: string;
  frontmatter: BlogFrontmatter;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlogDetail = ({ code, frontmatter, slug }: BlogDetailProps) => {
  const { darkModeActive } = useDarkMode();
  const { fontMode, toggleFontMode } = useFontMode();
  const { fontSize, setFontSize } = useFontSize();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const fontSizeMap: Record<string, string> = {
    xs: "14px",
    s: "16px",
    m: "18px",
    l: "20px",
    xl: "22px",
  };

  const lineHeightMap: Record<string, string> = {
    xs: "24px",
    s: "28px",
    m: "31px",
    l: "34px",
    xl: "37px",
  };

  const canonicalUrl = `https://fyfirman.com/blog/${slug}`;
  const publishedTime = new Date(frontmatter.publishedAt).toISOString();
  // Use default OG image since blog cover images are in src/assets, not public folder
  const ogImageUrl = "/img/og-image.jpg";

  // Structured data for blog post
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: frontmatter.title,
      description: frontmatter.description,
      image: `https://fyfirman.com${ogImageUrl}`,
      datePublished: publishedTime,
      dateModified: publishedTime,
      author: {
        "@type": "Person",
        name: "Firmansyah Yanuar",
        url: "https://fyfirman.com/about",
      },
      publisher: {
        "@type": "Person",
        name: "Firmansyah Yanuar",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
    }),
    [frontmatter.title, frontmatter.description, ogImageUrl, publishedTime, canonicalUrl],
  );

  useEffect(() => {
    try {
      /**
       * Disabled temporarily
       */
      // void BlogServices.postRead(slug);
    } catch (error: unknown) {
      tracer.error(error as Error);
    }
  }, []);

  return (
    <>
      <Head
        canonical={canonicalUrl}
        desc={frontmatter.description}
        ogImage={ogImageUrl}
        ogType="article"
        publishedTime={publishedTime}
        title={frontmatter.title}
      />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} type="application/ld+json" />
      <div
        className={clsx([styles.wrapper, darkModeActive && styles.dark])}
        style={
          {
            "--blog-font": fontMode === "serif" ? "var(--serif-font)" : "var(--base-font)",
            "--blog-font-size": fontSizeMap[fontSize],
            "--blog-line-height": lineHeightMap[fontSize],
          } as React.CSSProperties
        }
      >
        <BlogHeader
          language={frontmatter.language}
          publishedAt={new Date(frontmatter.publishedAt)}
          readingTime={frontmatter.readingTime}
          title={frontmatter.title}
        />
        <FontToggle
          fontMode={fontMode}
          toggleFontMode={toggleFontMode}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
        <Component
          components={{
            img: MdxImage,
            h1: Heading1,
            h2: Heading2,
            h3: Heading3,
            p: Paragraph,
            li: List,
            ul: UnorderedList,
            MdxImage,
            Youtube,
            EmbedBookmark,
            CloudinaryPlayer,
          }}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }: { params?: { slug?: string } }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const { frontmatter, code } = await getSingleBlogPost(params.slug);
  return {
    props: { code, frontmatter, slug: params.slug },
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
