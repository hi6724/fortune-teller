//pages/document.tsx

import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />
        <Script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
          integrity='sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
          crossOrigin='anonymous'
          strategy='lazyOnload'
        />

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              Kakao.init('${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}');
            `,
          }}
        /> */}
      </body>
    </Html>
  );
}
