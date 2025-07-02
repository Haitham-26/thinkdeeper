import { Input } from "../components/Input";

export default function Page() {
  return (
    <main className="px-4 md:px-8 h-screen bg-gray-900 content-center">
      <h1 className="md:max-w-xl text-white text-center text-4xl font-bold mx-auto">
        تسجيل الدخول
      </h1>

      <div className="md:max-w-xl px-6 py-8 mx-auto flex flex-col gap-6 mt-6 rounded-2xl border-2 border-gray-100 before:absolute before:w-full before:h-full before:bg-gray-700 before:rounded-[inherit] before:top-0 before:left-0 before:right-0 before:bottom-0 before:-z-[1] relative z-1">
        <Input title="الاسم" />

        <Input title="البريد الإلكتروني" />

        <Input title="كلمة المرور" />

        <button className="bg-white text-black py-2 px-5 mt-6 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          تسجيل الدخول
        </button>
      </div>
    </main>
  );
}
