import axios from "axios";
import app from "~/utils/firebase";

const sendMessage = async (message: string, senderName?: string) => {
  let ip = "";
  axios
    .get("https://api.ipify.org?format=json")
    .then((res) => {
      ip = res.data.ip;
    })
    .catch(() => {
      // TODO: bugsnag
    });

  return app.database().ref("messages/").push({
    date: new Date().toLocaleString(),
    senderName,
    message,
    ip,
  });
};

const MessageServices = {
  sendMessage,
};

export default MessageServices;
