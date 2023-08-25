import React from "react";
import Image, { ImageProps } from "next/image";
import { clsx } from "~/helpers/classname-helper";
import styled, { css } from "styled-components";
import { StyledComponentProps } from "~/interfaces/styled-component";
import useResponsive from "~/hooks/useResponsive";
import { Link } from "../typography/typography";
import styles from "./project-card.module.scss";

const Container = styled.div<
  {
    isClickable: boolean;
  } & StyledComponentProps
>`
  border-radius: 0;
  text-decoration: none;
  margin-bottom: 64px;

  cursor: ${(props) => (props.isClickable ? "pointer" : "inherit")};

  & img {
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover > .card-button::after {
    height: 2px;
    opacity: 1;
    transform: translateY(0);
  }

  &:hover > .not-available::after {
    opacity: 0;
  }
`;

const ImageContainer = styled.div<StyledComponentProps>`
  ${({ isMobile }) =>
    isMobile &&
    css`
      & > img {
        width: 100%;
        object-fit: contain;
        height: auto;
      }
    `}
`;

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
  tagText?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { href, imageURI, title, desc, stack, notAvailable = false, onClick, tagText = "Build with : " } = props;
  const { isMobile } = useResponsive();

  return (
    <Container isClickable={!!onClick} onClick={onClick}>
      <ImageContainer className={styles["card-image"]} isMobile={isMobile}>
        <Image alt={`${title} Snapshot`} src={imageURI} width="450" />
      </ImageContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
      <CardDescription>
        {tagText}
        {stack.join(", ")}
      </CardDescription>
      {href ? (
        <CardButton
          className={clsx([styles["card-button"], "card-button"])}
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          {!notAvailable ? "See Project ›" : "Not available yet"}
        </CardButton>
      ) : undefined}
    </Container>
  );
};

export default ProjectCard;
