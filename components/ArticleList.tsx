"use client";

import {
  getOneLatestArticle,
  getThreeLatestArticles,
} from "@/actions/article.action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type OneArticle = Awaited<ReturnType<typeof getOneLatestArticle>>;
type ThreeArticles = Awaited<ReturnType<typeof getThreeLatestArticles>>;

const ArticleList = () => {
  const [oneArticle, setOneArticle] = useState<OneArticle>();
  const [threeArticle, setThreeArticle] = useState<ThreeArticles>([]);

  useEffect(() => {
    const fetchData = async () => {
      const one = await getOneLatestArticle();
      const three = await getThreeLatestArticles();
      setOneArticle(one);
      setThreeArticle(three);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-10">
      <div className="flex md:flex-row flex-col w-full gap-6">
        <div className="md:w-1/2 w-full">
          {oneArticle ? (
            <Link href={`/article/${oneArticle?.id}`} prefetch={false}>
              <Card className="bg-background">
                <CardHeader>
                  <Image
                    src={
                      oneArticle?.imageUrl ?? "https://via.placeholder.com/150"
                    }
                    alt="image"
                    width={400}
                    height={200}
                    className="w-full h-[220px] object-cover rounded-lg "
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-xs bg-muted-foreground px-4 py-1 rounded-full text-background">
                      {oneArticle?.categoryArticle}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {dayjs(oneArticle?.createdAt).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 pt-8">
                    <h3 className="text-lg font-semibold text-gray-500">
                      {oneArticle?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {oneArticle?.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-[220px] rounded-lg" />
              <div className="flex items-center justify-between">
                <Skeleton className="w-[70px] h-[10px] rounded-lg" />
                <Skeleton className="w-[70px] h-[10px] rounded-lg" />
              </div>
              <Skeleton className="w-full h-[20px]" />
            </div>
          )}
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          {threeArticle?.length === 0 ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-[220px] rounded-lg" />
              <div className="flex items-center justify-between">
                <Skeleton className="w-[70px] h-[10px] rounded-lg" />
                <Skeleton className="w-[70px] h-[10px] rounded-lg" />
              </div>
              <Skeleton className="w-full h-[20px]" />
            </div>
          ) : (
            threeArticle?.map((article) => (
              <Link
                href={`/article/${article?.id}`}
                key={article?.id}
                prefetch={false}
              >
                <div className="flex flex-col gap-4">
                  <Card className="bg-background">
                    <CardContent>
                      <div className="flex w-full gap-4">
                        <div className="w-1/4">
                          <Image
                            src={article?.imageUrl.trimStart() || ""}
                            alt="image"
                            width={400}
                            height={200}
                            className="w-full h-[80px] rounded-2xl"
                          />
                        </div>
                        <div className="w-3/4 flex flex-col gap-2">
                          <div className="flex items-center gap-6">
                            <p className="text-xs bg-muted-foreground px-4 line-clamp-1 py-1 rounded-full text-background">
                              {article?.categoryArticle}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {article.readTime} min read
                            </span>
                          </div>
                          <h3 className="text-gray-500 text-xl font-semibold line-clamp-2">
                            {article?.title}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
