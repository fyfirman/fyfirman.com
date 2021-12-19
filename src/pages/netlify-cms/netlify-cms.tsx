import React from "react";
import { Head } from "@components/template";
// @ts-expect-error should be right, but need definition of content folder
import { attributes, react as Content } from "@content/hello-world.md";

const MessagePage = () => {
  const { title, tags, date } = attributes;
  return (
    <div>
      <Head title={title}>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Head>
      <article>
        <h1>{title}</h1>
        <span>{new Date(date as string).toLocaleString()}</span>
        <div>
          <Content />
        </div>
        <span>
          Tags : <i>{tags.map((tag: any) => tag.name).join(", ")}</i>
        </span>
      </article>
    </div>
  );
};

export default React.memo(MessagePage);
