import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); //拡張子を取り除いたファイル名

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    //マークダウンファイルのメタデータを取得
    const matterResult = matter(fileContent);

    // idとメタデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostData;
};

// getStaticPathのreturnで使うpathを取得

export const getPostIDs = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

// ファイル名にも基づいてブログデータを返す
export const getPostData = async (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
};
