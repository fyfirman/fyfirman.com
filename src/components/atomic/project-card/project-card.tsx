import React from "react";
import Image, { ImageProps } from "next/image";
import styled from "styled-components";
import { Link } from "../typography/typography";
import styles from "./project-card.module.scss";

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

export interface ProjectCardProps {
  href?: string;
  imageURI: ImageProps["src"];
  title: string;
  desc: string;
  stack: string[];
  notAvailable?: boolean;
  onClick?: () => void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { href, imageURI, title, desc, stack, notAvailable = false, onClick } = props;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events --- fuk u a11y
    <div className={styles["card-container"]} onClick={onClick}>
      <div className={styles["card-image"]}>
        <Image alt={`${title} Snapshot`} src={imageURI} width="450" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
      <CardDescription>Build with : {stack.join(", ")}</CardDescription>
      {href ? (
        <CardButton className={styles["card-button"]} href={href} rel="noreferrer" target="_blank">
          {!notAvailable ? "See Project ›" : "Not available yet"}
        </CardButton>
      ) : undefined}
    </div>
  );
};

export default ProjectCard;
