import { GenericSortType } from "@/model/shared/dto/GenericSortType";
import { GenericWithUserId } from "@/model/shared/dto/GenericWithUserId";

export interface GetQuestionsDto extends GenericWithUserId {
  sort?: GenericSortType;
  isPublic?: boolean;
}
