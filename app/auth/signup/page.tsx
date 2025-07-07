import Link from "next/link";
import { Input } from "../../components/Input";
import { AuthFormContainer } from "../_components/AuthFormContainer";

export default function Page() {
  return (
    <AuthFormContainer title="إنشاء حساب">
      <Input title="الاسم" />

      <Input title="البريد الإلكتروني" />

      <Input title="كلمة المرور" />

      <div className="flex flex-col gap-2">
        <button className="bg-white text-black py-2 px-5 mt-6 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          تسجيل الدخول
        </button>

        <Link
          href="/auth/signup"
          className="mt-1 ps-5 text-slate-300 hover:text-slate-100 transition-colors duration-300 ease-in-out block text-center py-2 px-5"
        >
          لديك حساب بالفعل؟
        </Link>
      </div>
    </AuthFormContainer>
  );
}
