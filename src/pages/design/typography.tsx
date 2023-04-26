import { motion } from "framer-motion";
import styled from "styled-components";
import { Heading1, Heading2, Heading3, Paragraph, SubParagraph } from "~/components/atomic/typography/typography";
import Head from "~/components/template/head/head";

const Title = styled(motion.h1)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 60px;
  line-height: 1;
  letter-spacing: -0.055em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

const RevampHeading1 = styled(motion.h1)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.045em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

const RevampHeading2 = styled(motion.h2)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 40px;
  letter-spacing: -0.04em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

const RevampHeading3 = styled(motion.h3)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.04em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;
const RevampHeading4 = styled(motion.h4)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.04em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;
const RevampHeading5 = styled(motion.h5)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.04em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;
const RevampHeading6 = styled(motion.h6)`
  color: var(--text-headings);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.04em;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

export const TextBase = styled(motion.p)`
  color: #374151;
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  margin-block-start: 0.33em;
  margin-block-end: 0.33em;
`;

export const CaptionText = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-body);
  font-family: var(--base-font);
`;

export const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: var(--text-body);
  font-family: var(--base-font);
`;

export const TagText = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--text-body);
  font-family: var(--base-font);
`;

const Typography: React.FC = () => {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Head title="Typography Showcase" />
      <Heading1>Heading 1</Heading1>
      <Heading2>Heading 2</Heading2>
      <Heading3>Heading 3</Heading3>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Paragraph>
      <SubParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </SubParagraph>
      <hr />
      <Title>Title Text</Title>
      <RevampHeading1>Heading 1</RevampHeading1>
      <RevampHeading2>Heading 2</RevampHeading2>
      <RevampHeading3>Heading 3</RevampHeading3>
      <RevampHeading4>Heading 4</RevampHeading4>
      <RevampHeading5>Heading 5</RevampHeading5>
      <RevampHeading6>Heading 6</RevampHeading6>
      <TextBase>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </TextBase>
      <CaptionText>Caption Text</CaptionText> <br />
      <ButtonText>Button Text</ButtonText> <br />
      <TagText>Tag Text</TagText>
    </main>
  );
};

export default Typography;
