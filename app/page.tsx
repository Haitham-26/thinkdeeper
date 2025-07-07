import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 md:px-8 bg-gray-950">
      <section className="min-h-screen content-center">
        <div className="flex flex-col items-center mx-auto justify-center gap-5">
          <h1 className="text-4xl text-center font-bold text-white animate-pulse">
            فكر بعمق
          </h1>
          <p className="text-xl text-white text-center">
            هنا يمكنك طرح أي سؤال قد يتبادر إلى ذهنك لا حدود والاطلاع على
            أسئلة لم تخطر على بالك من قبل
          </p>

          <div className="flex gap-3 mt-6">
            <Link
              href="/"
              className="bg-white text-black py-2 px-5 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out"
            >
              الاطلاع على أكثر الأسئلة تداولًا
            </Link>

            <Link
              href="/register"
              className="text-white rounded-full py-2 px-5 border-2 border-gray-200 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
            >
              شارك سؤالًا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
