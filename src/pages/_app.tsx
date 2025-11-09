import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */
const DEFAULT_SEO = {
  title: "홍예은 | Application Dev",
  description: "안녕하세요, 응용소프트웨어 개발자 홍예은입니다.",
  canonical: "https://portfolio-yenny.vercel.app/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://portfolio-yenny.vercel.app/",
    title: "홍예은 | Application Dev",
    site_name: "홍예은 | Application Dev",
    images: [
      {
        url: "https://portfolio-yenny.vercel.app/share.png",
        width: 285,
        height: 167,
        alt: "홍예은 | Application Dev",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "홍예은 | Application Dev",
    },
    {
      name: "msapplication-tooltip",
      content: "홍예은 | Application Dev",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
