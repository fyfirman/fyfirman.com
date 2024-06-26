import React, { useMemo } from "react";
import NextHead from "next/head";
import env from "~/utils/environment";

interface HeadProps {
  title?: string;
  desc?: string;
  hideWebTitle?: boolean;
  noIndex?: boolean;
}

const Head = (props: HeadProps) => {
  const { title, hideWebTitle = false, desc = env.metaDesc, noIndex = false } = props;

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
      <meta content={desc} name="description" />
      <link href="/favicon.ico" rel="shortcut icon" />
      {noIndex ? <meta content="noindex" data-sj-noindex name="robots" /> : null}
    </NextHead>
  );
};

export default React.memo(Head);
