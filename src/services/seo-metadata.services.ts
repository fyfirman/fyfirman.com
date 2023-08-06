import axios, { AxiosResponse } from "axios";
import env from "~/utils/environment";
import { SeoMetadata } from "~/pages/api/seo-metadata";

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
