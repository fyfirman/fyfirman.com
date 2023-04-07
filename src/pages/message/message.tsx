import React, { useMemo } from "react";
import Head from "@components/template/head";
import { useListVals } from "react-firebase-hooks/database";
import dynamic from "next/dynamic";
import MessageForm from "~/components/pages/message/message-form";
import { IMessage } from "~/interfaces/message";
import app from "~/utils/firebase";
import { Heading1, List, Paragraph, UnorderedList } from "~/components/atomic/typography/typography";
import styles from "./message.module.scss";

const WallOfMessage = dynamic(() => import("~/components/pages/message/wall-of-message"), { ssr: false });

const MessagePage = () => {
  const [values, isLoading] = useListVals<IMessage>(
    app.database().ref("messages").orderByChild("isPublic").equalTo(true),
  );

  const filteredData: IMessage[] = useMemo(() => {
    if (!values) {
      return [];
    }

    return values.sort((prev, next) => (prev.createdAt < next.createdAt ? 1 : -1));
  }, [values]);

  return (
    <div>
      <Head title="Message" />
      <Heading1>Send me a message</Heading1>
      <div className={styles["message-container"]}>
        <div style={{ flex: 1 }}>
          <Paragraph className="text-body">
            <b>Feel free</b> to message me about anything like :
          </Paragraph>
          <UnorderedList className="text-body">
            <List>Impression this website</List>
            <List>Discuss about software development (web/android)</List>
            <List>Request for mentorship</List>
            <List>Holding crypto-currency</List>
            <List>Hard feelings for me</List>
            <List>Anything you like</List>
          </UnorderedList>
          <Paragraph className="text-body">
            You can send <b>anonymously</b> or <b>write your name</b>. If you want to reply, please state in the
            message.
          </Paragraph>
          <Paragraph className="text-body">
            Please speak with <b>human language</b>, not a programming language. 😁
          </Paragraph>
        </div>
        <MessageForm />
      </div>
      <Heading1>Wall of message</Heading1>
      {!isLoading && values ? <WallOfMessage data={filteredData} /> : null}
    </div>
  );
};

export default React.memo(MessagePage);
