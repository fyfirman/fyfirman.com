import axios, { AxiosResponse } from "axios";
import env from "~/utils/environment";

const postRead = async (slug: string) => {
  const res: AxiosResponse<unknown> = await axios.post(`${env.backendUrl}/blog/${slug}/read`);

  return res;
};

const BlogServices = {
  postRead,
};

export default BlogServices;
