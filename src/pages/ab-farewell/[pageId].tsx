import type { GetServerSideProps, NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import styles from "~/styles/Blog.module.scss";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import * as notionType from "notion-types";
import { NotionCompatAPI } from "notion-compat";
import { Client } from "@notionhq/client";
import { useDarkMode } from "next-dark-mode";
import { Heading1 } from "~/components/atomic/typography/typography";
import Link from "next/link";

interface FarewellMessageProps {
  name: string;
  recordMap: notionType.ExtendedRecordMap;
}

const FarewellMessage: NextPage<FarewellMessageProps> = ({ name, recordMap }) => {
  const { darkModeActive } = useDarkMode();
  return (
    <>
      <Head noIndex title={`Farewell Message - ${name}`} />
      <div className={styles.headingContainer}>
        <Heading1 className="notion-page">{name}</Heading1>
        <NotionRenderer
          components={{
            PageLink: (props: any) => <Link {...props} href={`/ab-farewell/${props.href}`} />,
          }}
          darkMode={darkModeActive}
          fullPage={false}
          recordMap={recordMap}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FarewellMessageProps> = async (ctx) => {
  const notion = new NotionCompatAPI(new Client({ auth: process.env.NOTION_TOKEN }));

  const pageId = ctx.params?.pageId as string;
  const forwarded = ctx.req.headers["x-forwarded-for"];
  const userAgent = ctx.req.headers["user-agent"];
  const ip = typeof forwarded === "string" ? forwarded.split(/, /)[0] : ctx.req.socket.remoteAddress;

  const recordMap = await notion.getPage(pageId);
  const name = Object.values(recordMap.block)[0].value.properties?.title[0] ?? "";

  console.log(`Page ${name} is read \n ${ip} \n ${userAgent}`);

  return {
    props: {
      name,
      recordMap,
    },
  };
};

export default React.memo(FarewellMessage);
