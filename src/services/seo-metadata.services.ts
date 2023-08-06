import axios, { AxiosResponse } from "axios";
import env from "~/utils/environment";

export type SeoMetadata = {
  title: string;
  description: string;
  url: string;
  icoUrl?: string;
};

const postGenerate = async (url: string) => {
  const res: AxiosResponse<SeoMetadata> = await axios.post(`${env.scraperServiceUrl}/seo-scraper`, {
    url,
  });

  return res;
};

const SeoMetadataService = {
  postGenerate,
};

export default SeoMetadataService;
