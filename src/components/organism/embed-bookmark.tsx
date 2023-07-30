import { useQuery } from "@tanstack/react-query";
import React from "react";
import Bookmark from "~/components/molecules/bookmark";
import SeoMetadataService from "~/services/seo-metadata.services";

interface EmbedBookmarkProps {
  url: string;
}

const EmbedBookmark: React.FC<EmbedBookmarkProps> = ({ url }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["seo-metadata", url],
    queryFn: async () => {
      const res = await SeoMetadataService.postGenerate(url);
      return res.data;
    },
  });

  return (
    <Bookmark
      description={data?.description}
      icoUrl={data?.icoUrl}
      isLoading={isLoading}
      title={data?.title}
      url={url}
    />
  );
};

export default EmbedBookmark;
