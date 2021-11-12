import React, { SyntheticEvent, useMemo, useState } from "react";
import { Head } from "@components/template";
import styles from "./message.module.scss";
import MessageServices from "~/services/message.services";

const MessagePage = () => {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const buttonText = useMemo(() => {
    if (isSuccess) {
      return "Message sent! Thank you";
    }
    if (isLoading) {
      return "Please wait";
    }
    return "SEND";
  }, [isSuccess, isLoading]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!message) {
      setError({ isError: true, message: "Please fill your message" });
      return;
    }
    setIsLoading(true);

    try {
      await MessageServices.sendMessage(message, senderName);

      setIsSuccess(true);
      setIsLoading(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError({ isError: true, message: error.message });
      } else {
        setError({ isError: true, message: "Undefined Error" });
      }
      setIsLoading(false);
    }
  };

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
            You can send <b>anonymously</b> or <b>write your name</b>. If you
            want to reply, please state in the message.
          </p>
          <p className="text-body">
            Please speak with <b>human language</b>, not a programming language.
            😁
          </p>
        </div>
        <form
          style={{ display: "flex", flex: 1, gap: 16, flexDirection: "column" }}
        >
          <input
            className={styles.input}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Name (You can leave it blank)"
            type="text"
          />
          <textarea
            className={styles.input}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Put your message here"
          />
          <input
            className={styles["send-button"]}
            disabled={isSuccess || isLoading}
            onClick={handleSubmit}
            type="submit"
            value={buttonText}
          />
          <span
            className={`${styles["error-message"]} ${
              error.isError && !isSuccess ? "visible" : "hidden"
            }`}
          >
            {error.isError ? error.message : ""}
          </span>
        </form>
      </div>
    </div>
  );
};

export default MessagePage;
