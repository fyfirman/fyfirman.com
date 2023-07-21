import Head from "~/components/template/head";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import dynamic from "next/dynamic";
// eslint-disable-next-line import/no-unresolved --- it's resolved but eslint keep marking this as an error
import "@mdxeditor/editor/style.css";
import styled from "styled-components";

const MDXEditor = dynamic(() => import("@mdxeditor/editor").then((mod) => mod.MDXEditor), { ssr: false });

const mdxTemplate = `---
title: Hello World
publishedAt: 2022-09-30T00:00:00.000Z
description: Hello world description.
language: id
coverImage: hello-world-1.jpg
---

Hello **world**!

`;

const StyledMDXEditor = styled(MDXEditor)`
  background-color: white;
  border-radius: 4px;
  border: 1px solid hsl(210, 40.00000000000007%, 94.11764705882352%);
`;

interface BlogEditorProps {}

const desc = "Blog Editor for fyfirman.com/blog using @mdxeditor";

const BlogEditor = (_: BlogEditorProps) => {
  return (
    <>
      <Head desc={desc} title="Blog Editor" />
      <div>
        <Heading1>Blog Editor</Heading1>
        <Paragraph>{desc}</Paragraph>
        <StyledMDXEditor
          jsxComponentDescriptors={[
            {
              kind: "text",
              name: "Heading1",
              source: "../../components/atomic/typography/typography",
              props: [
                {
                  name: "className",
                  type: "number",
                },
              ],
              defaultExport: false,
            },
          ]}
          markdown={mdxTemplate}
        />
      </div>
    </>
  );
};

export default BlogEditor;
