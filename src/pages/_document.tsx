import { Layout } from "@/components/Layout";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='-10' y='80' font-size='90'%3E%F0%9F%8C%88%3C/text%3E%3C/svg%3E"
        />
      </Head>
      <Layout>
        <body>
          <Main />
          <NextScript />
        </body>
      </Layout>
    </Html>
  );
}
