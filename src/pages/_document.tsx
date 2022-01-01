import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { getNoScriptGTM, getScriptGTM } from "~/utils/gtm";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: getScriptGTM(),
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: getNoScriptGTM(),
              }}
            />
          </>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
