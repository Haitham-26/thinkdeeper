import Link from "next/link";
import { Icon } from "./components/Icon";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center w-full px-6 bg-[#0f172a] text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-8">
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
          <Icon icon={faCircleExclamation} className="text-accent text-4xl" />
        </div>

        <div className="space-y-4">
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter">
            404
          </h1>
          <h2 className="text-slate-200 font-bold text-2xl md:text-3xl">
            عذراً، تِهنا قليلاً!
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-lg font-medium leading-relaxed">
            الصفحة التي تبحث عنها غير موجودة، ربما تم نقلها أو حذفها نهائياً.
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 py-4 px-10 rounded-2xl font-bold text-lg bg-accent text-white shadow-xl shadow-accent/20 hover:bg-accent/90 hover:-translate-y-1 transition-all duration-300"
          >
            العودة للرئيسية
            <Icon icon={faHome} className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}
