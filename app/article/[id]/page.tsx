import { getArticle } from "@/actions/article.action";
import { getAllComments } from "@/actions/commen.action";
import { getCurrentUser, getDBUserId } from "@/actions/user.action";
import ArticleDetail from "@/components/ArticleDetail";
import CommentSection from "@/components/CommentSection";
import LikeArticle from "@/components/LikeArticle";
import { currentUser } from "@clerk/nextjs/server";

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const userId = await getDBUserId();
  const currentUser = await getCurrentUser();

  const article = await getArticle(id);
  const comments = await getAllComments(id);

  return (
    <div className="md:px-16 px-4 py-10">
      <ArticleDetail article={article} />
      <LikeArticle article={article} userId={userId} />
      <CommentSection
        article={article}
        comments={comments}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ArticlePage;
