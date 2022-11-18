import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import path from "path";
import Layout from "../../components/Layout";
import { getPostData, getPostIDs } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

type PostDataType = {
  id: number;
  blogContentHTML: string;
  title: string;
  date: string;
  thumbnail: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostIDs();
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const postData = await getPostData(params!.id);

  return {
    props: {
      postData,
    },
  };
};

const Post = ({ postData }: { postData: PostDataType }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
};

export default Post;
