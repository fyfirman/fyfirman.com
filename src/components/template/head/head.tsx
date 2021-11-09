import React, { useMemo } from "react";
import NextHead from "next/head";
import env from "~/utils/environment";

interface HeadProps {
  title?: string;
  hideWebTitle?: boolean;
}

const Head = (props: HeadProps) => {
  const { title, hideWebTitle = false } = props;

  const finalTitle = useMemo(() => {
    if (hideWebTitle && title) {
      return title;
    }
    if (title) {
      return `${title} | ${env.title}`;
    }
    return env.title;
  }, [title, hideWebTitle]);

  return (
    <NextHead>
      <title>{finalTitle}</title>
      <meta name="description" content={env.metaDesc} />
      <link rel="icon" href="/img/logo.svg" />
    </NextHead>
  );
};

export default Head;
