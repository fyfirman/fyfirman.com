export interface IMessage extends IMessageOption {
  senderName?: string;
  message: string;
  createdAt: number;
}

export interface IMessageOption {
  isPublic: boolean;
}
