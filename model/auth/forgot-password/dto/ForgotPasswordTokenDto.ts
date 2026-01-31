import { ForgotPasswordEmailDto } from "./ForgotPasswordEmailDto";

export interface ForgotPasswordTokenDto extends ForgotPasswordEmailDto {
  token: string;
}
