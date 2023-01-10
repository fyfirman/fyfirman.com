import React, { useMemo } from "react";
import { IMessage } from "~/interfaces/message";
import { clsx } from "~/helpers/classname-helper";
import { formatTimeStampToDateDifference } from "~/helpers/date-helper";
import styles from "./wall-of-message-card.module.scss";

interface WallOfMessageProps {
  data: IMessage;
}
const WallOfMessageCard = ({ data }: WallOfMessageProps) => {
  const { senderName, message, createdAt } = data;

  const isAnonim = useMemo(() => !senderName, [senderName]);

  return (
    <div className={styles.container}>
      <span className={clsx([styles.sender, isAnonim && styles.anonim])}>{!isAnonim ? senderName : "// anonim"}</span>
      <p className={styles.message}>{message}</p>
      <span className={styles.date}>{formatTimeStampToDateDifference(createdAt)}</span>
    </div>
  );
};

export default WallOfMessageCard;
