import React, { FC } from "react";
import styles from "./wall-of-message.module.scss";
import WallOfMessageCard from "./wall-of-message-card";
import { IMessage } from "~/interfaces/message";
import { useResponsive } from "~/hooks";
import { clsx } from "~/helpers/classname-helper";

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
