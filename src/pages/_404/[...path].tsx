import { GetServerSideProps, NextPage } from "next";
import Head from "~/components/template/head/head";
import { addHttpsIfNeeded } from "~/helpers/string-helper";
import UrlServices from "~/services/url.services";

const Custom404: NextPage = () => {
  return (
    <>
      <Head title="404" />

      <div>404 not found</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { resolvedUrl } = ctx;
    const shortSlug = resolvedUrl.split("/").at(-1);

    if (!shortSlug) {
      throw new Error("Short slug is not defined");
    }

    const longUrl = await UrlServices.getLongUrl(shortSlug);

    return { redirect: { destination: addHttpsIfNeeded(longUrl), permanent: false } };
  } catch (error: unknown) {
    return { props: { error: (error as Error).message } };
  }
};

export default Custom404;
