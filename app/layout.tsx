
import { Cairo } from "next/font/google";
import "./globals.css";

// استدعاء خط "كايرو" الذي يدعم اللغة العربية بشكل ممتاز
const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "900"]
});

// المعلومات الأساسية للموقع (تظهر في محركات البحث وفي عنوان المتصفح)
export const metadata: Metadata = {
  title: "منيو المطعم",
  description: "قائمة الطعام الرقمية الذكية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // تحديد اللغة والاتجاه الافتراضي للتطبيق كاملاً
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
