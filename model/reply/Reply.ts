export interface Reply {
  _id: string;
  name?: string;
  reply: string;
  questionId: string;
  likesCount: number;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
}
