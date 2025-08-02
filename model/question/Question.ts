import { Like } from "../like/Like";
import { Reply } from "../reply/Reply";

export interface Question {
  _id: string;
  userId: string;
  question: string;
  replies: Reply[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
}
