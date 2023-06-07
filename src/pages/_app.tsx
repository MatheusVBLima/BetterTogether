import Footer from "@/components/footer/Footer";
import { Provider } from "@/context/Context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styles from "@/styles/app.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className={styles.wrapper}>
        <Component {...pageProps} />
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}
