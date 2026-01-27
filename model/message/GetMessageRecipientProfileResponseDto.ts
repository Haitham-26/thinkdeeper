import { User } from "../user/User";

export interface GetMessageRecipientProfileResponseDto {
  name: User["name"];
  username: User["username"];
  avatar?: User["avatar"];
}
