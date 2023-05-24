import { Layout } from "@/components/Layout";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Layout>
      <body>
        <Main />
        <NextScript />
      </body>
      </Layout>
    </Html>
  );
}
