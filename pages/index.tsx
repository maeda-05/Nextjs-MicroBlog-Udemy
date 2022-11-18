import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData, getPostData } from "../lib/post";

type allPostDataType = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};

// SSGの場合
export async function getStaticProps() {
  const allPostData = getPostsData();
  // console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}

export default function Home({
  allPostData,
}: {
  allPostData: allPostDataType[];
}) {
  // console.log(allPostData);
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyle.headingMd}>
          <p>
            私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです
          </p>
        </section>
        <section>
          <h2 className={utilStyle.headingLg}>📝エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostData.map((postData) => {
              return (
                <article key={postData.id}>
                  <Link href={`/posts/${postData.id}`}>
                    <Image
                      src={postData.thumbnail}
                      alt="サムネイル"
                      width={950}
                      height={400}
                      className={styles.thumbnailImage}
                    />
                  </Link>
                  <Link
                    href={`/posts/${postData.id}`}
                    className={utilStyle.boldText}
                  >
                    {postData.title}
                  </Link>
                  <br />
                  <small className={utilStyle.lightText}>{postData.date}</small>
                </article>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}
