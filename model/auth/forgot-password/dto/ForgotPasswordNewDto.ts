import { ForgotPasswordTokenDto } from "./ForgotPasswordTokenDto";

export interface ForgotPasswordNewDto extends ForgotPasswordTokenDto {
  password: string;
}
