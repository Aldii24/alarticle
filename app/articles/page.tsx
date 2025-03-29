"use client";

import { getArticles } from "@/actions/article.action";
import SeeAllArticleList from "@/components/SeeAllArticleList";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

type AllArticles = Awaited<ReturnType<typeof getArticles>>;

const ArticlesPage = () => {
  const [articles, setArticles] = useState<AllArticles>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="md:px-16 px-4 py-10">
      <div className="flex flex-col gap-10">
        <h3 className="md:text-3xl text-xl text-gray-500 font-semibold">
          All Articles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles?.length === 0 ? (
            <>
              <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-[220px] rounded-lg" />
                <Skeleton className="w-full h-[40px]" />
                <div className="flex items-center justify-between">
                  <Skeleton className="w-[70px] h-[15px] rounded-lg" />
                  <Skeleton className="w-[90px] h-[25px] rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-[220px] rounded-lg" />
                <Skeleton className="w-full h-[40px]" />
                <div className="flex items-center justify-between">
                  <Skeleton className="w-[70px] h-[15px] rounded-lg" />
                  <Skeleton className="w-[90px] h-[25px] rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-[220px] rounded-lg" />
                <Skeleton className="w-full h-[40px]" />
                <div className="flex items-center justify-between">
                  <Skeleton className="w-[70px] h-[15px] rounded-lg" />
                  <Skeleton className="w-[90px] h-[25px] rounded-full" />
                </div>
              </div>
            </>
          ) : (
            articles?.map((article) => (
              <SeeAllArticleList key={article?.id} article={article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
