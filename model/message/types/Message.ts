export interface Message {
  _id: string;
  message: string;
  name?: string;
  recipientId: string;

  /** For the message recipient only */
  isStarred?: boolean;

  createdAt: Date;
  updatedAt: Date;
}
