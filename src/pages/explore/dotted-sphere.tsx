import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import useResponsive from "~/hooks/useResponsive";
import DottedSphere from "~/components/pages/explore-dotted-sphere/dotted-sphere";

const desc =
  "A grainy gradient with a dotted sphere, rebuilt from a reference image in a WebGL shader. Move your cursor to tilt it.";

const DottedSpherePage: NextPage = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head desc={desc} ogImage="/img/og-dotted-sphere.jpg" title="Dotted Sphere" />
      <Heading1>Dotted Sphere</Heading1>
      <Paragraph isMobile={isMobile}>{desc}</Paragraph>
      <DottedSphere />
    </>
  );
};

export default React.memo(DottedSpherePage);
