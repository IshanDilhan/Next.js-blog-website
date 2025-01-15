import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "./components/header"
import "./globals.css";
import Footer from "./components/footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
            {/* <p>Welcome to Next.js 15 Crash Course</p> */}
            <Header/>
             <div className="mt-14"></div>
          {children}
          
          <Footer/>
        </body>
      </html>
    
  );
}
