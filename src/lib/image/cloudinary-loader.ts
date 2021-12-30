import { buildUrl, extractPublicId, setConfig } from "cloudinary-build-url";
import { ImageLoaderProps } from "next/image";
import env from "~/utils/environment";

setConfig({
  cloudName: env.cloudinary.cloudName,
});

export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  console.log(env.cloudinary.cloudName);
  const url = buildUrl(extractPublicId(src), {
    transformations: {
      resize: {
        width,
      },
      quality,
      effect: {
        name: "pixelate",
        value: 40,
      },
    },
  });
  return url;
};
