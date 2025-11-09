import SantNavbar from "../components/sant-navbar";
import CreateArticleForm from "../components/articles/article-form";
import { useTranslations } from "next-intl";

export default function CreateArticlePage() {
  const t = useTranslations();
  return (
    <>
      <SantNavbar activeMenu="Blogs" onMenuClick={() => {}} t={t} />
      <CreateArticleForm />
    </>
  );
}