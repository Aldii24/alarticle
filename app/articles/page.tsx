import { getArticles } from "@/actions/article.action";
import SeeAllArticleList from "@/components/SeeAllArticleList";

const ArticlesPage = async () => {
  const articles = await getArticles();

  return (
    <div className="md:px-16 px-4 py-10">
      <div className="flex flex-col gap-10">
        <h3 className="md:text-3xl text-xl text-gray-500 font-semibold">
          All Articles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles?.map((article) => (
            <SeeAllArticleList key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
