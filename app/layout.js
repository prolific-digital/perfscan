import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ApolloProvider from "@/components/providers/ApolloProvider";
import ToastContainer from "@/components/common/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PerfScan - IBM Power Systems Performance Monitor",
  description: "Comprehensive performance monitoring and analysis for IBM Power Systems (AS/400, iSeries, IBM i)",
  keywords: "IBM Power Systems, AS/400, iSeries, IBM i, performance monitoring, capacity planning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ApolloProvider>
            {children}
            <ToastContainer />
          </ApolloProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
