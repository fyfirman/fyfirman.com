import React, { memo } from "react";
import DummyServices from "~/services/dummy.services";

const ServerSide = (props) => {
  return <div>{JSON.stringify(props)}</div>;
};

export const getServerSideProps = async () => {
  const res = await DummyServices.getPostList();

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: res,
    },
  };
};

export default memo(ServerSide);
