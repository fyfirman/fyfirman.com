import React, { FC, useMemo } from "react";
import NextHead from "next/head";
import env from "~/utils/environment";

interface HeadProps {
  title?: string;
  hideWebTitle?: boolean;
  children: React.ReactNode;
}

const Head: FC<HeadProps>= (props) => {
  const { title, hideWebTitle = false, children } = props;

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
      <meta content={env.metaDesc} name="description" />
      <link href="/img/logo.svg" rel="icon" />
      {children}
    </NextHead>
  );
};

export default React.memo(Head);
