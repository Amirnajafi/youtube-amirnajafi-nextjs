import {Html, Head, Main, NextScript} from 'next/document';

export default function Document(props: any) {
  const {__NEXT_DATA__: nextData} = props;
  const {locale} = nextData;
  return (
    <Html dir={locale === 'en' ? 'ltr' : 'rtl'} lang={locale} id="html">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="My page description" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
