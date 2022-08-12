import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://media.discordapp.net/attachments/992301342360080507/1007577029664845885/logoNew.png"
        />
        <meta
          property="og:image"
          content="https://media.discordapp.net/attachments/992301342360080507/1007576385524604959/headerImage.png?width=928&height=499"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://writez.xyz" />
        <meta property="og:title" content="Writez" />
        <meta property="og:description" content="Writez is a decentralized, open-source, blogging platform that allows you to write, own and fund your ideas" />
        <meta name="theme-color" content="#5500FF" />
        {/* For large image  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:type" content="article" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
