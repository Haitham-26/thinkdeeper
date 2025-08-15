import type { Metadata } from "next";
import "./globals.css";
import { cairoFont } from "./fonts";
import { Header } from "./components/Header";
import getToken from "@/tools/getToken";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "فكر بعمق",
  description: "هنا يمكنك طرح أي سؤال قد يتبادر إلى ذهنك لا حدود",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairoFont.className} min-h-screen flex flex-col overflow-y-auto bg-secondary`}
      >
        <Header token={token} />
        <div className="pt-16 flex-grow flex">{children}</div>
        <Toaster position="top-left" />
      </body>
    </html>
  );
}
