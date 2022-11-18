import Head from "next/head";
import { ReactNode } from "react";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
import Link from "next/link";

const name = "Shin Code";
export const siteTitle = "Next.js Blog";

function Layout({ children, home }: { children: ReactNode; home?: boolean }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
              alt="プロフィール画像"
              width={90}
              height={90}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Image
              src="/images/profile.png"
              className={`${utilStyles.borderCircle}`}
              alt="プロフィール画像"
              width={90}
              height={90}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href='/'>←ホームに戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
