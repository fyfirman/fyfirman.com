import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import UploadFiles from "~/components/pages/explore-upload-files/upload-files";

const desc =
  "An upload dialog rebuilt from a disarto.co shot. Drop or browse files to watch them upload; uploads are simulated, nothing leaves your browser.";

const UploadFilesPage: NextPage = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head desc={desc} ogImage="/img/og-upload-files.jpg" title="Upload Files" />
      <Heading1>Upload Files</Heading1>
      <Paragraph isMobile={isMobile}>{desc}</Paragraph>
      <UploadFiles />
    </>
  );
};

export default React.memo(UploadFilesPage);
