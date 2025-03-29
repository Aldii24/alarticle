import { getArticle } from "@/actions/article.action";
import ArticleDetail from "@/components/ArticleDetail";

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const article = await getArticle(id);

  return (
    <div className="md:px-16 px-4 py-10">
      <ArticleDetail article={article} />
    </div>
  );
};

export default ArticlePage;
