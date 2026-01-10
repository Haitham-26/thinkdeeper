export interface Message {
  _id: string;
  message: string;
  name?: string;
  recipientId: string;
  createdAt: Date;
  updatedAt: Date;
}
