import { Reply } from "../reply/Reply";

export interface Question {
  _id: string;
  userId: string;
  question: string;
  replies: Reply[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
