import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { WalletProvider } from "@/contexts/WalletContext";
import Header from "@/components/Header";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "On-Chain Prediction Arena",
  description: "A multi-game on-chain prediction platform powered by Monad and AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} antialiased`}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#2b1f0c_0%,_#120b04_45%,_#050301_100%)]">
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0b0b0f",
                  color: "#fff",
                  border: "1px solid #1f1f2e",
                },
                success: {
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#0b0b0f",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#0b0b0f",
                  },
                },
              }}
            />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}