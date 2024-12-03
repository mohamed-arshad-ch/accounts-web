import "@/styles/globals.css";
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose required weights
  style: ['normal', 'italic'], // Optional, if italic styles are needed
  variable: '--font-poppins', // Optional CSS variable
});

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  );
}

