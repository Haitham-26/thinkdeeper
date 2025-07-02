import type { Metadata } from "next";
import "./globals.css";
import { cairoFont } from "./fonts";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "فكر بعمق",
  description: "هنا يمكنك طرح أي سؤال قد يتبادر إلى ذهنك لا حدود",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairoFont.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
