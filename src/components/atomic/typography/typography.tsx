import { motion } from "framer-motion";
import styled from "styled-components";

export const Heading1 = styled(motion.h1)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
  letter-spacing: -0.025em;
`;

export const Heading2 = styled(motion.h2)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: -0.025em;
`;

export const Paragraph = styled(motion.p)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 31px;
`;

export const SubParagraph = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  color: var(--text-body);
  font-family: var(--base-font);
`;
