import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="w-screen h-screen">
            <Toaster />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
