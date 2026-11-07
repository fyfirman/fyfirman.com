import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import GradientGenerator from "~/components/pages/explore-gradient-generator/gradient-generator";

const desc =
  "Make your own grainy gradient. Pick a base colour and get palettes picked with colour theory, then shuffle, tweak and download it as a PNG.";

const GradientGeneratorPage: NextPage = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head desc={desc} title="Gradient Generator" />
      <Heading1>Gradient Generator</Heading1>
      <Paragraph isMobile={isMobile}>{desc}</Paragraph>
      <GradientGenerator />
    </>
  );
};

export default React.memo(GradientGeneratorPage);
