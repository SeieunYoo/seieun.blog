import { metaData } from "@/constants/metaData";
import { DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
  defaultTitle: metaData.title,
  description: metaData.description,
  canonical: metaData.url,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: metaData.url,
    siteName: metaData.title,
    images: [
      {
        url: metaData.imageUrl,
      },
    ],
  },
  twitter: {
    cardType: "summary",
  },
};

export default DEFAULT_SEO;
