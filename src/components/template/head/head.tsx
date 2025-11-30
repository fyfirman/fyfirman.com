import React, { useMemo } from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import env from "~/utils/environment";

interface HeadProps {
  title?: string;
  desc?: string;
  hideWebTitle?: boolean;
  noIndex?: boolean;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const Head = (props: HeadProps) => {
  const {
    title,
    hideWebTitle = false,
    desc = env.metaDesc,
    noIndex = false,
    canonical,
    ogImage,
    ogType = "website",
    publishedTime,
    modifiedTime,
  } = props;
  const router = useRouter();

  const finalTitle = useMemo(() => {
    if (hideWebTitle && title) {
      return title;
    }
    if (title) {
      return `${title} | ${env.title}`;
    }
    return env.title;
  }, [title, hideWebTitle]);

  const canonicalUrl = useMemo(() => {
    if (canonical) {
      return canonical;
    }
    // Construct canonical URL from pathname (without query parameters)
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://fyfirman.com";
    const pathname = router.asPath.split("?")[0]; // Remove query parameters
    return `${baseUrl}${pathname}`;
  }, [canonical, router.asPath]);

  const ogImageUrl = useMemo(() => {
    if (ogImage) {
      return ogImage.startsWith("http") ? ogImage : `https://fyfirman.com${ogImage}`;
    }
    return "https://fyfirman.com/img/og-image.jpg";
  }, [ogImage]);

  return (
    <NextHead>
      <title>{finalTitle}</title>
      <meta content={desc} name="description" />
      <link href={canonicalUrl} rel="canonical" />
      <link href="/favicon.ico" rel="shortcut icon" />
      {noIndex ? <meta content="noindex" data-sj-noindex name="robots" /> : null}

      {/* Open Graph / Facebook */}
      <meta content={ogType} property="og:type" />
      <meta content={canonicalUrl} property="og:url" />
      <meta content={finalTitle} property="og:title" />
      <meta content={desc} property="og:description" />
      <meta content={ogImageUrl} property="og:image" />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={canonicalUrl} name="twitter:url" />
      <meta content={finalTitle} name="twitter:title" />
      <meta content={desc} name="twitter:description" />
      <meta content={ogImageUrl} name="twitter:image" />

      {/* Article specific meta tags */}
      {publishedTime ? <meta content={publishedTime} property="article:published_time" /> : null}
      {modifiedTime ? <meta content={modifiedTime} property="article:modified_time" /> : null}
    </NextHead>
  );
};

export default React.memo(Head);
