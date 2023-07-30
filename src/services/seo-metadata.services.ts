import axios, { AxiosResponse } from "axios";
import { SeoMetadata } from "~/pages/api/seo-metadata";
import env from "~/utils/environment";

const postGenerate = async (url: string) => {
  const res: AxiosResponse<SeoMetadata> = await axios.post(`${env.baseUrl}/api/seo-metadata`, {
    url,
  });

  return res;
};

const SeoMetadataService = {
  postGenerate,
};

export default SeoMetadataService;
