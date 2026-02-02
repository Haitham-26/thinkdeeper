import { Question } from "../Question";

export interface GetPublicQuestionsResponseDto {
  data: Question[];
  meta: {
    hasNext: boolean;
    total: number;
    currentPage: number;
  };
}
