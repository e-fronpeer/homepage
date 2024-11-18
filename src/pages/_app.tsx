import dynamic from "next/dynamic";
import { SWRConfig } from "swr";
import "../index.css";
import { fetcher } from "@/lib/fetcher";
import { ComponentType } from "react";
import type { AppProps } from "next/app";

const AppWithWouter: ComponentType<{ children: React.ReactNode }> = dynamic(
  () => import("@/pages/AppWithWouter"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <AppWithWouter>
        <Component {...pageProps} />
      </AppWithWouter>
    </SWRConfig>
  );
}