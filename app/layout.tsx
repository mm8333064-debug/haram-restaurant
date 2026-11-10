import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "منيو المطعم الرقمي",
  description: "نظام إدارة وعرض قوائم الطعام للمطاعم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
