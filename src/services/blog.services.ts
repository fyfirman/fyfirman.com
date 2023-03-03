import axios, { AxiosResponse } from "axios";

const postRead = async (slug: string) => {
  const res: AxiosResponse<{ ip: string }> = await axios.get(
    `https://fyfirman-blog-service-3ukvs5ptha-uc.a.run.app/blog/${slug}/read`,
  );

  return res.data.ip;
};

const BlogServices = {
  postRead,
};

export default BlogServices;
