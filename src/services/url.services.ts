import app from "~/utils/firebase";
import z from "zod";

const refName = "urls";

const getLongUrl = async (shortUrl: string): Promise<string> => {
  const longUrls = await app.database().ref(refName).once("value");

  if (!longUrls.val()[shortUrl]) {
    throw new Error("Short URL is not found");
  }

  return longUrls.val()[shortUrl];
};

const getAllUrls = async (): Promise<Record<string, string>> => {
  const longUrls = await app.database().ref(refName).once("value");

  const nonEmptyStringSchema = z.string().min(1);
  const recordSchema = z.record(nonEmptyStringSchema);

  recordSchema.parse(longUrls.val());

  return longUrls.val();
};

const shortSlugUrlSchema = z
  .string()
  .max(25)
  .regex(/^[a-zA-Z0-9-]+$/);
const longUrlSchema = z.string().url();

export const CreateShortUrlRequest = z.object({
  shortSlugUrl: shortSlugUrlSchema,
  longUrl: longUrlSchema,
});

const createShortUrl = async (payload: z.infer<typeof CreateShortUrlRequest>) => {
  CreateShortUrlRequest.parse(payload);

  const { shortSlugUrl, longUrl } = payload;

  const longUrls = await app.database().ref(refName).once("value");
  await app
    .database()
    .ref(refName)
    .set({
      ...longUrls.val(),
      [shortSlugUrl]: longUrl,
    });
};

const UrlServices = {
  getLongUrl,
  getAllUrls,
  createShortUrl,
};

export default UrlServices;
