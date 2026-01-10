import { User } from "../user/User";

export interface GetMessageRecipientProfileResponseDto {
  _id: User["_id"];
  name: User["name"];
}
