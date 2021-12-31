import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import env from "~/utils/environment";

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
            {/* Google Tag Manager */}
            {/* eslint-disable-next-line @next/next/next-script-for-ga */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${env.firebaseConfig.gtmId}');`,
              }}
            />
            {/* End Google Tag Manager */}
            {/* Google Tag Manager (noscript) */}
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${env.firebaseConfig.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
            {/* End Google Tag Manager (noscript) */}
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
