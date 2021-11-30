import React from "react";
import { Head } from "@components/template";
import styles from "./message.module.scss";
import MessageForm from "~/components/pages/message/message-form";

const MessagePage = () => {
  return (
    <div>
      <Head title="Message" />
      <h3 className={styles.title}>Send me a message</h3>
      <div className={styles["message-container"]}>
        <div style={{ flex: 1 }}>
          <p className="text-body">
            <b>Feel free</b> to message me about anything like :
          </p>
          <ul className="text-body">
            <li>Impression this website</li>
            <li>Discuss about software development (web/android)</li>
            <li>Request for mentorship</li>
            <li>Holding crypto-currency</li>
            <li>Hard feelings for me</li>
            <li>Anything you like</li>
          </ul>
          <p className="text-body">
            You can send <b>anonymously</b> or <b>write your name</b>. If you want to reply, please state in the
            message.
          </p>
          <p className="text-body">
            Please speak with <b>human language</b>, not a programming language. 😁
          </p>
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default React.memo(MessagePage);
