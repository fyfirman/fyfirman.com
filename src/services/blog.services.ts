import axios, { AxiosResponse } from "axios";

const postRead = async (slug: string) => {
  const res: AxiosResponse<unknown> = await axios.post(
    `https://fyfirman-blog-service-3ukvs5ptha-uc.a.run.app/blog/${slug}/read`,
  );

  return res;
};

const BlogServices = {
  postRead,
};

export default BlogServices;
