import type { NextPage } from "next";
import Head from "@components/template/head";
import React from "react";
import { ProjectCard } from "~/components/atomic";
import mdxEditor from "@assets/images/explore-cover/mdx-editor.jpg";
import framerMotion from "@assets/images/explore-cover/framer-motion.jpg";
import type { ProjectCardProps } from "~/components/atomic/project-card/project-card";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import { useRouter } from "next/router";
import styled from "styled-components";

const ProjectContainer = styled.div`
  display: flex;
  gap: min(4vw, 48px);
  flex-direction: row;
  padding-right: min(15vw - 80px, 15%);

  & > div {
    flex: 1;
  }
`;

const projectList: (ProjectCardProps & {
  slug: string;
})[] = [
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
  const router = useRouter();

  return (
    <>
      <Head desc={desc} title="Explore" />

      <Heading1>Explore</Heading1>
      <Paragraph>{desc}</Paragraph>
      <ProjectContainer>
        {projectList.map((p) => (
          <ProjectCard key={p.title} {...p} onClick={() => router.push(`/explore/${p.slug}`)} tagText="Tags : " />
        ))}
      </ProjectContainer>
    </>
  );
};

export default React.memo(ExplorePage);
