import Link from "next/link";
import { Input } from "../../components/Input";
import { AuthFormContainer } from "../_components/AuthFormContainer";

export default function Page() {
  return (
    <AuthFormContainer title="تسجيل الدخول">
      <Input title="البريد الإلكتروني" />

      <div>
        <Input title="كلمة المرور" />

        <Link
          href="/auth/forgot-password"
          className="mt-1 ps-5 text-slate-300 hover:text-slate-100 transition-colors duration-300 ease-in-out text-xs"
        >
          نسيت كلمة المرور؟
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <button className="bg-white text-black py-2 px-5 mt-6 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          تسجيل الدخول
        </button>

        <Link
          href="/auth/signup"
          className="mt-1 ps-5 text-slate-300 hover:text-slate-100 transition-colors duration-300 ease-in-out block text-center py-2 px-5"
        >
          ليس لديك حساب؟
        </Link>
      </div>
    </AuthFormContainer>
  );
}
