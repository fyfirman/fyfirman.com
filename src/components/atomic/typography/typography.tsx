import { motion } from "framer-motion";
import styled from "styled-components";
import NextLink from "next/link";

export const Heading1 = styled(motion.h1)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
  letter-spacing: -0.025em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

export const Heading2 = styled(motion.h2)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: -0.025em;
`;

export const Heading3 = styled(motion.h3)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.025em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

export const Paragraph = styled(motion.p)`
  color: var(--text-body);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 31px;
  margin-block-start: 0.33em;
  margin-block-end: 2rem;
`;

export const SubParagraph = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  color: var(--text-body);
  font-family: var(--base-font);
`;

export const AltText = styled(SubParagraph)`
  margin-top: 12px;
  color: var(--text-secondary);
  font-style: italic;
`;

export const UnorderedList = styled(motion.ul)`
  color: var(--text-body);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 31px;
  margin-block-start: 0.33em;
  margin-block-end: 2rem;
`;

export const List = styled(motion.li)`
  color: var(--text-body);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 31px;
`;

export const Link = styled(NextLink)`
  color: var(--text-body);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 31px;
`;
