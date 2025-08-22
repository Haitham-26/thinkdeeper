import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex items-center justify-center">
      <section className="max-w-xl w-full">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-extrabold text-secondary animate-pulse">
            فكر بعمق
          </h1>

          <p className="text-lg leading-relaxed max-w-md text-text-muted">
            هنا يمكنك طرح أي سؤال قد يتبادر إلى ذهنك، لا حدود والاطلاع على أسئلة
            لم تخطر على بالك من قبل
          </p>

          <div className="flex gap-6">
            <Link
              href="/"
              className="py-3 px-7 rounded-full font-semibold shadow-md bg-secondary text-primary hover:bg-surface transition-colors duration-300 ease-in-out"
            >
              الاطلاع على أكثر الأسئلة تداولًا
            </Link>

            <Link
              href="/register"
              className="py-3 px-7 rounded-full font-semibold border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary transition-colors duration-300 ease-in-out shadow-md"
            >
              شارك سؤالًا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
