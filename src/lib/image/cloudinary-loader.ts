import { buildUrl, extractPublicId, setConfig } from "cloudinary-build-url";
import { ImageLoaderProps } from "next/image";
import env from "~/utils/environment";

setConfig({
  cloudName: env.cloudinary.cloudName,
});

export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const url = buildUrl(extractPublicId(src), {
    // TODO: change cloud name
    cloud: {
      cloudName: "fyfirman",
    },
    transformations: {
      resize: {
        width,
      },
      quality,
    },
  });
  return url;
};
