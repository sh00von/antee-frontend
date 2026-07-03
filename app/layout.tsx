import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Antee Solutions - Industrious Web Development",
  description:
    "Enterprise-grade Web, Mobile App, and ERP systems engineered for high performance. We don't just build software; we engineer resilient digital ecosystems.",
  keywords: [
    "Antee Solutions",
    "Web Development",
    "Mobile App Development",
    "ERP Systems",
    "Enterprise Software",
    "SaaS",
    "Infrastructure",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* React 19 native resource hoisting */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f0f11] text-gray-300 antialiased selection:bg-antee-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
