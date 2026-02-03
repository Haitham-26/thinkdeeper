import { PageMeta } from "@/model/shared/types/PageMeta";
import { Question } from "../Question";

export interface GetPublicQuestionsResponseDto {
  data: Question[];
  meta: PageMeta;
}
