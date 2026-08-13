import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";


const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ["개발자", "포트폴리오", "소프트웨어 엔지니어", "임민규", "Developer", "Portfolio", "Lim Mingyu", "Mingyu Lim", "임민규 포트폴리오", "C#", "C# 개발자", "C# Developer", "C샵", "Csharp", "WPF", "WPF 개발자", "Next.js", "React", "프론트엔드", "Backend", "백엔드"],
  authors: [{ name: "임민규" }],
  creator: "임민규",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pretendard: 외부 연결 미리 확보 + 렌더링 비차단 로드 (LCP/FCP 개선) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link
          rel="preload"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <noscript>
          <link
            rel="stylesheet"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var l=document.createElement('link');l.rel='stylesheet';l.crossOrigin='anonymous';l.href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';document.head.appendChild(l);})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_CONFIG.url}/#website`,
                  url: SITE_CONFIG.url,
                  name: SITE_CONFIG.name,
                  alternateName: ["임민규 포트폴리오", "개발자 포트폴리오", "Mingyu Portfolio"],
                  description: SITE_CONFIG.description,
                  publisher: {
                    "@id": `${SITE_CONFIG.url}/#person`,
                  },
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_CONFIG.url}/#person`,
                  name: "임민규",
                  jobTitle: "개발자 (Developer)",
                  url: SITE_CONFIG.url,
                  image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
                  sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.blog].filter(Boolean),
                  description: SITE_CONFIG.description,
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${noto.variable} font-sans min-h-screen antialiased flex flex-col`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>

      </body>
    </html>
  );
}
