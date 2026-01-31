import { AuthFormContainer } from "../../_components/AuthFormContainer";
import { ForgotPasswordTokenContent } from "./_components/ForgotPasswordTokenContent";

export default async function Page() {
  return (
    <AuthFormContainer
      title="استرجاع كلمة السر"
      subtitle="التحقق من البريد الإلكتروني"
    >
      <p className="text-text-muted text-sm">
        <span className="block">
          لقد قمنا بإرسال رمز التحقق إلى بريدك الإلكتروني، يرجى إدخاله في الحقل
          في الأسفل حتى تتمكن من تعيين كلمة سر جديدة.
        </span>

        <span className="block">
          إن لم تجد البريد في صندوق الوارد، يرجى التحقق من صندوق
        </span>
      </p>

      <ForgotPasswordTokenContent />
    </AuthFormContainer>
  );
}
