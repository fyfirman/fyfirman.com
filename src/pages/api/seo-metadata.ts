import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import { JSDOM } from "jsdom";

export type SeoMetadata = {
  title: string;
  description: string;
  url: string;
  icoUrl?: string;
};

export const RequestBodySchema = z.object({
  url: z.string().trim().url(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<SeoMetadata | ZodError>) {
  const validation = RequestBodySchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(validation.error);
  }
  const reqBody = req.body as z.infer<typeof RequestBodySchema>;

  const resHtml = await axios.get(reqBody.url);
  const dom = new JSDOM(resHtml.data);
  const { document } = dom.window;

  const icoPath = document.querySelector("link[rel~='icon']")?.getAttribute("href");
  const icoUrl = `${new URL(reqBody.url).origin}${icoPath}`;
  res.status(200).json({
    title: document.title,
    description: document.querySelector("meta[name=description]")?.getAttribute("content") ?? "",
    url: reqBody.url,
    icoUrl,
  });
}
