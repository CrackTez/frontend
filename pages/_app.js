import "../styles/globals.css";
import DarkModeState from "../Context/DarkModeState";
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
      <DarkModeState>
        <Component {...pageProps} />
      </DarkModeState>
    </SafeHydrate>
  );
}

export default MyApp;
