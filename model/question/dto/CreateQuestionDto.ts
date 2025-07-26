import { GenericWithUserId } from "@/model/shared/dto/GenericWithUserId";

export interface CreateQuestionDto extends GenericWithUserId {
  question: string;
}
