import React, { SyntheticEvent, useMemo, useState } from "react";
import axios from "axios";
import styles from "./message.module.scss";

const MessagePage = () => {
  const [name, setName] = useState("");
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

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!message) {
      setError({ isError: true, message: "Please fill your message" });
      return;
    }
    setIsLoading(true);
    axios
      .get("https://api.ipify.org?format=json")
      .then(
        (res) => {
          // firebase
          //   .database()
          //   .ref("messages/")
          //   .push({
          //     date: new Date().toLocaleString(),
          //     senderName: name,
          //     message,
          //     ip: res.data.ip,
          //   })
          //   .then(() => {
          //     setIsSuccess(true);
          //     setIsLoading(false);
          //   });
        },
        () => {
          // firebase
          //   .database()
          //   .ref("messages/")
          //   .push({
          //     date: new Date().toLocaleString(),
          //     senderName: name,
          //     message,
          //   })
          //   .then(() => {
          //     setIsSuccess(true);
          //     setIsLoading(false);
          //   });
        }
      )
      .catch((e) => {
        setError({ isError: true, message: e.message });
        setIsLoading(false);
      });
  };

  return (
    <>
      <h3 className={styles.title}>Send me a message</h3>
      <div className={styles.container}>
        <div style={{ flex: 1 }}>
          <p className={styles.body}>
            <b>Feel free</b> to message me about anything like :
          </p>
          <ul className={styles.list}>
            <li>Impression this website</li>
            <li>Discuss about software development (web/android)</li>
            <li>Request for mentorship</li>
            <li>Holding crypto-currency</li>
            <li>Hard feelings for me</li>
            <li>Anything you like</li>
          </ul>
          <p className={styles.body}>
            You can send <b>anonymously</b> or <b>write your name</b>. If you want to reply, please
            state in the message.
          </p>
          <p className={styles.body}>
            Please speak with <b>human language</b>, not a programming language. 😁
          </p>
        </div>
        <form style={{ display: "flex", flex: 1, gap: 16, flexDirection: "column" }}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (You can leave it blank)"
          />
          <textarea
            placeholder="Put your message here"
            onChange={(e) => setMessage(e.target.value)}
            className={styles.input}
          />
          <input
            type="submit"
            className={styles["send-button"]}
            value={buttonText}
            onClick={handleSubmit}
            disabled={isSuccess || isLoading}
          />
          <span
            className={`${styles["error-message"]} ${error && !isSuccess ? "visible" : "hidden"}`}
          >
            {error?.message ?? ""}
          </span>
        </form>
      </div>
    </>
  );
};

export default MessagePage;
