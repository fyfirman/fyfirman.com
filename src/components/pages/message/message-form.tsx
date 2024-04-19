import React, { SyntheticEvent, useMemo, useState } from "react";
import MessageServices from "~/services/message.services";
import Checkbox from "~/components/atomic/checkbox";
import styles from "./message-form.module.scss";

const MessageForm = () => {
  const [senderName, setSenderName] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
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
      await Promise.allSettled([
        await MessageServices.sendMessage(message, senderName, { isPublic }),
        await MessageServices.sendMessageV2(message, senderName, { isPublic }),
      ]);

      setIsSuccess(true);
      setIsLoading(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError({ isError: true, message: e.message });
      } else {
        setError({ isError: true, message: "Undefined Error" });
      }
      setIsLoading(false);
    }
  };
  return (
    <form style={{ display: "flex", flex: 1, gap: 16, flexDirection: "column" }}>
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
      <Checkbox id="isPublic" label="Post in wall of message" onChange={setIsPublic} />
      <input
        className={styles["send-button"]}
        disabled={isSuccess || isLoading}
        onClick={handleSubmit}
        type="submit"
        value={buttonText}
      />
      <span className={`${styles["error-message"]} ${error.isError && !isSuccess ? "visible" : "hidden"}`}>
        {error.isError ? error.message : ""}
      </span>
    </form>
  );
};

export default React.memo(MessageForm);
