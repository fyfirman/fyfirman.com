import React, { FC } from "react";
import styles from "./wall-of-message.module.scss";
import { IMessage } from "~/interfaces/message";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";
import WallOfMessageCard from "~/components/atomic/wall-of-message-card";

interface WallOfMessageProps {
  data: IMessage[];
}

const WallOfMessage: FC<WallOfMessageProps> = ({ data }) => {
  const { isMobile } = useResponsive();

  return (
    <div>
      {data.length > 0 ? (
        <div className={clsx([styles.container, isMobile && styles.mobile])}>
          {data.map((message, index) => (
            <WallOfMessageCard key={index} data={message} />
          ))}
        </div>
      ) : (
        <span>Data kosong</span>
      )}
    </div>
  );
};

export default WallOfMessage;
