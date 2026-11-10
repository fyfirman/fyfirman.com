import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import { ProjectCard } from "~/components/atomic";
import mdxEditor from "@assets/images/explore-cover/mdx-editor.jpg";
import framerMotion from "@assets/images/explore-cover/framer-motion.jpg";
import dottedSphere from "@assets/images/explore-cover/dotted-sphere.jpg";
import uploadFiles from "@assets/images/explore-cover/upload-files.jpg";
import orbGenerator from "@assets/images/explore-cover/orb-generator.jpg";
import type { ProjectCardProps } from "~/components/atomic/project-card/project-card";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useResponsive from "~/hooks/useResponsive";
import { StyledComponentProps } from "~/interfaces/styled-component";

const ProjectContainer = styled.div<StyledComponentProps>`
  display: flex;
  gap: min(4vw, 48px);
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: min(15vw - 80px, 15%);

  & > div {
    flex: 0 0 calc((100% - 2 * min(4vw, 48px)) / 3);
    min-width: 0;
  }

  & img {
    width: 100%;
    height: auto;
    aspect-ratio: 450 / 250;
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;

      & > div {
        flex: 1;
      }
    `}
`;

const projectList: (ProjectCardProps & {
  slug: string;
})[] = [
  {
    title: "Orb Generator",
    desc: "A generator for grainy, marbled orbs. Pick a palette, shuffle the pattern and download a PNG. A WebGL shader on a turning sphere.",
    imageURI: orbGenerator,
    stack: ["WebGL", "Generator"],
    slug: "orb-generator",
  },
  {
    title: "Upload Files",
    desc: "A pixel-close upload dialog with drag and drop, tick-mark progress bars and simulated uploads. Built with styled-components and Framer Motion.",
    imageURI: uploadFiles,
    stack: ["React", "UI"],
    slug: "upload-files",
  },
  {
    title: "Dotted Sphere",
    desc: "A grainy gradient with a dotted sphere that spins, drifts and leans toward your cursor. Plain WebGL and canvas.",
    imageURI: dottedSphere,
    stack: ["WebGL", "Animation"],
    slug: "dotted-sphere",
  },
  {
    title: "MDX Editor",
    desc: "An open-source React component that allows users to author markdown documents naturally. Just like in Google docs or Notion.",
    imageURI: mdxEditor,
    stack: ["Typescript", "MDX"],
    slug: "mdx-editor",
  },
  {
    title: "Framer Motion",
    desc: "Framer Motion is a simple yet powerful motion library for React.",
    imageURI: framerMotion,
    stack: ["Typescript", "Animation"],
    slug: "framer-motion",
  },
];

const desc = "Curated new tools/library that has been explored";

const ExplorePage: NextPage = () => {
  const { isMobile } = useResponsive();
  const router = useRouter();

  return (
    <>
      <Head desc={desc} title="Explore" />

      <Heading1>Explore</Heading1>
      <Paragraph isMobile={isMobile}>{desc}</Paragraph>
      <ProjectContainer isMobile={isMobile}>
        {projectList.map((p) => (
          <ProjectCard key={p.title} {...p} onClick={() => router.push(`/explore/${p.slug}`)} tagText="Tags : " />
        ))}
      </ProjectContainer>
    </>
  );
};

export default React.memo(ExplorePage);
