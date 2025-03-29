import { getArticle } from "@/actions/article.action";
import ArticleDetail from "@/components/ArticleDetail";

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const article = await getArticle(id);

  return (
    <div className="md:px-16 px-4 py-10">
      <ArticleDetail article={article} />
    </div>
  );
};

export default ArticlePage;
