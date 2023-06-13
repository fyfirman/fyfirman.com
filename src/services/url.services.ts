import app from "~/utils/firebase";

const refName = "urls";

const getLongUrl = async (shortUrl: string): Promise<string> => {
  const longUrl = await app.database().ref(refName).once("value");

  if (!longUrl.val()[shortUrl]) {
    throw new Error("Short URL is not found");
  }

  return longUrl.val()[shortUrl];
};

const UrlServices = {
  getLongUrl,
};

export default UrlServices;
