import dayjs from "dayjs";
import markdownit from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import mdSanitizer from "sanitize-html";

const SearchListArticle = ({ articles }: { articles: any }) => {
  const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
  });

  const content = mdSanitizer(md.render(articles?.content || ""));

  return (
    <div className="mt-10">
      <Link
        href={`/article/${articles?.id}`}
        className="flex  gap-6 border p-5 rounded-lg"
        prefetch={true}
      >
        <div className="flex md:flex-row flex-col gap-8">
          <Image
            src={articles?.imageUrl}
            alt={articles?.title}
            width={300}
            height={300}
            className="md:w-[150px] md:h-[150px] w-full h-[150px] object-cover rounded-lg"
          />
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-8">
                <h2 className="md:text-2xl font-semibold text-gray-500 line-clamp-2">
                  {articles?.title}
                </h2>
                <p className="text-xs bg-muted-foreground px-4 py-1 rounded-full text-background w-max">
                  {articles?.categoryArticle}
                </p>
              </div>
              <article
                dangerouslySetInnerHTML={{ __html: content }}
                className="line-clamp-3 text-muted-foreground"
              />

              <div className="flex gap-3 items-center">
                <p className="text-xs text-muted-foreground">
                  {dayjs(articles?.createdAt).format("MMM DD, YYYY")}
                </p>
                <span>•</span>
                <p className="text-xs text-muted-foreground">
                  Author: {""}
                  {articles?.author?.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchListArticle;
