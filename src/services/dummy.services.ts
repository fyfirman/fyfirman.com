import { IPaginationResponse } from "~/interfaces/response.interface";
import { IPost } from "~/interfaces/user.interface";
import env from "~/utils/environment";

const getPostList = async (): Promise<IPaginationResponse<IPost>> => {
  const endpoint = "https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109ca/post?limit=10";
  const res = await fetch(endpoint, {
    // @ts-expect-error: should be not error
    headers: {
      "app-id": env.dummyApiId,
    },
  });
  return res.json();
};

const DummyServices = {
  getPostList,
};

export default DummyServices;
