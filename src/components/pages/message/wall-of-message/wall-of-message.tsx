import React from "react";
import StackGrid from "react-stack-grid";
import { IMessage } from "~/interfaces/message";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";
import WallOfMessageCard from "~/components/atomic/wall-of-message-card";
import styles from "./wall-of-message.module.scss";

interface WallOfMessageProps {
  data: IMessage[];
}

const WallOfMessage: React.VFC<WallOfMessageProps> = ({ data }) => {
  const { isMobile } = useResponsive();

  return (
    <div>
      {data.length > 0 ? (
        <StackGrid
          className={clsx([styles.container, isMobile && styles.mobile])}
          columnWidth={isMobile ? "100%" : "33.3%"}
          gutterHeight={15}
          gutterWidth={15}
        >
          {data.map((message, index) => (
            <WallOfMessageCard key={index} data={message} />
          ))}
        </StackGrid>
      ) : (
        <span>Data kosong</span>
      )}
    </div>
  );
};

export default WallOfMessage;
