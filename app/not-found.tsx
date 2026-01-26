import Link from "next/link";
import { Icon } from "./components/Icon";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <h1 className="text-accent font-bold text-2xl">الصفحة غير موجودة</h1>
      <p className="text-accent">الصفحة المطلوبة غير موجودة أو تم حذفها</p>

      <Link
        href="/auth/signup"
        className="py-4 px-12 rounded-2xl font-bold text-lg bg-accent text-white shadow-xl shadow-accent/30 hover:-translate-y-1 transition-all duration-300"
      >
        العودة للرئيسية
        <Icon icon={faHome} className="mr-3" />
      </Link>
    </div>
  );
}
