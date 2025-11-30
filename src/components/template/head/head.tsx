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
}

const Head = (props: HeadProps) => {
  const { title, hideWebTitle = false, desc = env.metaDesc, noIndex = false, canonical } = props;
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

  return (
    <NextHead>
      <title>{finalTitle}</title>
      <meta content={desc} name="description" />
      <link href={canonicalUrl} rel="canonical" />
      <link href="/favicon.ico" rel="shortcut icon" />
      {noIndex ? <meta content="noindex" data-sj-noindex name="robots" /> : null}
    </NextHead>
  );
};

export default React.memo(Head);
