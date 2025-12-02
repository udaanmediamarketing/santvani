import SantNavbar from "../components/sant-navbar";
import CreateArticleForm from "../components/articles/article-form";

export default function CreateArticlePage() {
  return (
    <>
      <SantNavbar activeMenu="Blogs" onMenuClick={() => {}}/>
      <CreateArticleForm />
    </>
  );
}