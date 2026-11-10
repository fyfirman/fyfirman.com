import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import OrbGenerator from "~/components/pages/explore-orb-generator/orb-generator";

const desc =
  "A generator for grainy, marbled orbs, rebuilt from a reference image in a WebGL shader. Pick a palette, shuffle the pattern and download a PNG.";

const OrbGeneratorPage: NextPage = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head desc={desc} ogImage="/img/og-orb-generator.jpg" title="Orb Generator" />
      <Heading1>Orb Generator</Heading1>
      <Paragraph isMobile={isMobile}>{desc}</Paragraph>
      <OrbGenerator />
    </>
  );
};

export default React.memo(OrbGeneratorPage);
