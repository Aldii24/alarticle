import { getArticles } from "@/actions/article.action";
import { getUserRoleAdmin } from "@/actions/user.action";
import CreateArticle from "@/components/CreateArticle";
import DashboardArticle from "@/components/DashboardArticle";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  const ADMIN = await getUserRoleAdmin();
  const articles = await getArticles();

  if (!ADMIN) {
    redirect("/");
  }

  return (
    <div className="flex flex-col md:px-16 px-4 py-10">
      <div className="flex justify-between items-center ">
        <h1 className="md:text-3xl text-xl font-semibold text-muted-foreground">
          Dashboard
        </h1>
        <CreateArticle />
      </div>

      <DashboardArticle articles={articles} />
    </div>
  );
};

export default DashBoardPage;
