import React from "react";
import Image, { ImageProps } from "next/image";
import styled from "styled-components";
import { Heading3, Link, Paragraph } from "../typography/typography";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  href: string;
  imageURI: ImageProps["src"];
  title: string;
  desc: string;
  stack: string[];
  notAvailable?: boolean;
}

const CardTitle = styled.span`
  color: var(--text-body);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 31px;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

const CardDescription = styled.p`
  color: var(--text-body);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

const CardButton = styled(Link)`
  font-size: 14px;
  line-height: 25px;
`;

const ProjectCard = (props: ProjectCardProps) => {
  const { href, imageURI, title, desc, stack, notAvailable = false } = props;

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-image"]}>
        <Image alt={`${title} Snapshot`} src={imageURI} width="450" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
      <CardDescription>Build with : {stack.join(", ")}</CardDescription>
      <CardButton className={styles["card-button"]} href={href} rel="noreferrer" target="_blank">
        {!notAvailable ? "See Project ›" : "Not available yet"}
      </CardButton>
    </div>
  );
};

export default ProjectCard;
