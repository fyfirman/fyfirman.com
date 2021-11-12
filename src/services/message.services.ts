import UtilsServices from "./utils.services";
import app from "~/utils/firebase";

const sendMessage = async (message: string, senderName?: string) => {
  const ip = await UtilsServices.getUserIP();

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
