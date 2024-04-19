import firebase from "firebase/app";
import app from "~/utils/firebase";
import { IMessageOption } from "~/interfaces/message";
import axios from "axios";
import UtilsServices from "./utils.services";

const MESSAGE_MAX_LENGTH = 200;
const SENDER_NAME_MAX_LENGTH = 30;

const sendMessage = async (message: string, senderName?: string, options?: IMessageOption) => {
  const ip = await UtilsServices.getUserIP();

  if (message.length > MESSAGE_MAX_LENGTH) {
    throw new Error("Message cannot be more than 200 character");
  }

  if (senderName && senderName.length > SENDER_NAME_MAX_LENGTH) {
    throw new Error("Your name cannot be more than 200 character");
  }

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

const sendMessageV2 = async (message: string, senderName?: string, options?: IMessageOption) => {
  const response = await axios.post("/api/message", {
    message,
    senderName,
    isPublic: options?.isPublic,
  });
  return response.data;
};

const MessageServices = {
  sendMessage,
  sendMessageV2,
};

export default MessageServices;
