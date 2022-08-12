import "../styles/globals.css";
import DarkModeState from "../Context/DarkModeState";
import hljs from 'highlight.js';
import Head from 'next/head'
function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
  <SafeHydrate>
    <Head>
        <title>Writez</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Writez" key="title" />
        <meta property="og:description" content="Writez is a decentralized, open-source, platform that allows you to write, share, and read your writing on the web." key="description" />
        
      </Head>
      <DarkModeState>
        <Component {...pageProps} />
      </DarkModeState>
    </SafeHydrate>
 
  );
}

export default MyApp;
