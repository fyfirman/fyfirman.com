import React, { useMemo } from "react";
import styles from "./wall-of-message-card.module.scss";
import { IMessage } from "~/interfaces/message";
import { clsx } from "~/helpers";
import { formatTimeStampToDateDifference } from "~/helpers/date-helper";

interface WallOfMessageProps {
  data: IMessage;
}
const WallOfMessageCard = ({ data }: WallOfMessageProps) => {
  const { senderName, message, createdAt } = data;

  const isAnonim = useMemo(() => !senderName, [senderName]);

  return (
    <div className={styles.container}>
      <div className={clsx([styles.sender, isAnonim && styles.anonim])}>{!isAnonim ? senderName : "// anonim"}</div>
      <div className={styles.message}>{message}</div>
      <div className={styles.date}>{formatTimeStampToDateDifference(createdAt)}</div>
    </div>
  );
};

export default WallOfMessageCard;
