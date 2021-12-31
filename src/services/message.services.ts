import firebase from "firebase/app";
import UtilsServices from "./utils.services";
import app from "~/utils/firebase";
import { IMessageOption } from "~/interfaces/message";

const sendMessage = async (message: string, senderName?: string, options?: IMessageOption) => {
  const ip = await UtilsServices.getUserIP();

  return app
    .database()
    .ref("messages/")
    .push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      senderName,
      message,
      ip,
      ...options,
    });
};

const MessageServices = {
  sendMessage,
};

export default MessageServices;
