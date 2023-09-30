import axios, { AxiosResponse } from "axios";
import { ContributionCalendar } from "~/interfaces/github-contribution";
import env from "~/utils/environment";

const postRead = async (slug: string) => {
  const res: AxiosResponse<unknown> = await axios.post(`${env.backendUrl}/blog/${slug}/read`);

  return res;
};

const getGithubContribution = async () => {
  const res: AxiosResponse<{
    data: ContributionCalendar;
  }> = await axios.get(`${env.backendUrl}/github-contrib`);

  return res;
};

const BlogServices = {
  postRead,
  getGithubContribution,
};

export default BlogServices;
