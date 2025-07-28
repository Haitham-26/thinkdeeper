import { Reply } from "./types/Reply";

export interface Question {
  _id: string;
  userId: string;
  question: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}
