import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { HTMLAttributes } from "react";

interface CloudinaryPlayerProps extends HTMLAttributes<HTMLVideoElement> {
  publicId: string;
}

const CloudinaryPlayer = ({ publicId, ...rest }: CloudinaryPlayerProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "fyfirman",
    },
  });

  const myVideo = cld.video(publicId);

  return <AdvancedVideo cldVid={myVideo} controls style={{ width: "100%" }} {...rest} />;
};

export default CloudinaryPlayer;
