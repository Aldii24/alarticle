import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

const SeeAllArticleList = ({ article }: { article: any }) => {
  return (
    <>
      <Link
        href={`/article/${article?.id}`}
        className="flex flex-col"
        prefetch={true}
      >
        <Image
          src={article?.imageUrl}
          alt={article?.title}
          width={500}
          height={500}
          className="md:w-[500px] md:h-[300px] w-full h-[250px] object-cover rounded-lg"
        />
        <h2 className="md:text-2xl text-lg font-semibold text-gray-500 mt-4 line-clamp-2">
          {article?.title}
        </h2>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground mt-4">
            {article?.readTime} min read
          </p>
          <p className="text-sm bg-muted-foreground px-4 py-1 rounded-full text-background mt-4">
            Read More
          </p>
        </div>
      </Link>

      <Separator className="md:hidden" />
    </>
  );
};

export default SeeAllArticleList;
