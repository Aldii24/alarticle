import Link from "next/link";
import { Button } from "./ui/button";
import ArticleList from "./ArticleList";
import { ArrowRight } from "lucide-react";

const Article = () => {
  return (
    <div className="md:px-16 px-4 pt-16">
      <div className="flex justify-between gap-10 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-500">
            Latest Posts...
          </h2>
          <span className="text-xs text-gray-500 line-clamp-1">
            Check out our content at a alarticle. Like what u see? Explore the
            guide to see more.
          </span>
        </div>
        <Button
          asChild
          className="border rounded-lg bg-transparent text-white hover:bg-transparent cursor-pointer "
        >
          <Link href="/articles">
            <span>See All</span>
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>

      <ArticleList />
    </div>
  );
};

export default Article;
