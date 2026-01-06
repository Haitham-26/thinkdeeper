import Link from "next/link";
import { faUserShield } from "@fortawesome/free-solid-svg-icons/faUserShield";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";

import { Icon } from "./components/Icon";

const features = [
  {
    title: "حماية الخصوصية",
    description:
      "نحن لا نشارك بياناتك مع أي طرف، وهويتك تبقى مجهولة دائماً عند إرسال الرسائل.",
    icon: faUserShield,
  },
  {
    title: "تفاعل سريع",
    description:
      "نظام إشعارات فوري يخبرك فور وصول رسالة جديدة إلى صندوق بريدك.",
    icon: faBolt,
  },
  {
    title: "بيئة إيجابية",
    description:
      "أدوات ذكية للإبلاغ عن المحتوى غير اللائق لضمان تجربة مستخدم مريحة.",
    icon: faComments,
  },
];

const steps = [
  {
    title: "أنشئ حسابك",
    description: "خطوات بسيطة وسريعة لامتلاك صفحتك الخاصة.",
    icon: faUserPlus,
  },
  {
    title: "انشر رابطك",
    description: "شارك الرابط على ستوري انستجرام أو تويتر.",
    icon: faShareNodes,
  },
  {
    title: "استلم الرسائل",
    description: "استمتع بقراءة ما كتبه الناس لك بصراحة.",
    icon: faInbox,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-text-primary w-full">
      <section className="relative flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 -z-10 h-full w-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-accent/5 to-transparent opacity-50"></div>
        </div>

        <section className="max-w-4xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold text-accent bg-accent/10 rounded-full border border-accent/20">
            <Icon icon={faUserShield} className="w-4 h-4" />
            منصة آمنة بنسبة 100%
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            استقبل رسائل <br />
            <span className="text-accent underline decoration-accent/20 underline-offset-[20px]">
              بصراحة تامة
            </span>
          </h1>

          <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto mb-12">
            اكتشف ما يفكر به الآخرون تجاهك، استقبل نصائحهم، أو أجب على أسئلتهم
            دون معرفة هويتهم.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/register"
              className="group py-4 px-12 rounded-2xl font-bold text-lg bg-accent text-white shadow-xl shadow-accent/30 hover:-translate-y-1 transition-all duration-300"
            >
              ابدأ الآن مجاناً
              <Icon icon={faBolt} className="mr-3 group-hover:animate-pulse" />
            </Link>

            <Link
              href="/how-it-works"
              className="py-4 px-12 rounded-2xl font-bold text-lg border-2 border-border bg-surface text-text-primary hover:bg-surface-muted transition-all"
            >
              شاهد التفاصيل
            </Link>
          </div>
        </section>
      </section>

      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-10 rounded-[2.5rem] border border-border bg-surface hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon={feature.icon} className="text-accent text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-20">
          كيف تبدأ رحلتك؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10"></div>

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-surface border-4 border-background shadow-xl flex items-center justify-center group-hover:border-accent transition-colors">
                  <Icon icon={step.icon} className="text-3xl text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              هل أنت جاهز لسماع الحقيقة؟
            </h2>
            <Link
              href="/register"
              className="inline-block bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-white transition-all"
            >
              سجل الآن وابدأ باستقبال الرسائل
            </Link>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
      </section>
    </div>
  );
}
