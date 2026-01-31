import { Info } from "@/app/components/Info";
import { AuthFormContainer } from "../_components/AuthFormContainer";
import { SignUpContent } from "./_components/SignUpContent";

export default function Page() {
  return (
    <AuthFormContainer title="مرحبًا بك في بصراحة" subtitle="إنشاء حساب">
      <Info>
        التسجيل باستخدام البريد الإلكتروني وكلمة المرور غير متوفر بعد لأسباب
        تقنية، يرجى التسجيل باستخدام جوجل في الأسفل.
      </Info>
      <SignUpContent />
      <div className="mt-8 text-center space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
          من خلال الاستمرار، أنت توافق على <br />
          <span className="text-slate-300 underline decoration-accent/40 underline-offset-4 cursor-pointer hover:text-accent transition-all">
            شروط الاستخدام وسياسة الخصوصية
          </span>
        </p>
      </div>
    </AuthFormContainer>
  );
}
