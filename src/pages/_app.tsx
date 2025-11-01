import { SWRConfig } from "swr";
import "../index.css";
import "../styles/markdown.css";
import { fetcher } from "@/lib/fetcher";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}