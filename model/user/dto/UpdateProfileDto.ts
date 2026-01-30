import { User } from "../User";

export interface UpdateProfileDto {
  name?: User["name"];
  username?: User["username"];
}
