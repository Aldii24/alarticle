import dayjs from "dayjs";
import Image from "next/image";
import markdownit from "markdown-it";
import mdSanitizer from "sanitize-html";

const ArticleDetail = ({ article }: { article: any }) => {
  const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
  });

  const content = mdSanitizer(md.render(article?.content || ""));

  return (
    <div className="flex flex-col mx-auto">
      <div className="flex justify-center items-center gap-4 ">
        <p className="md:text-sm text-xs bg-muted-foreground px-4 line-clamp-1 py-1 rounded-full text-background">
          {article?.categoryArticle}
        </p>
        <span className="md:text-sm text-xs text-muted-foreground">
          {dayjs(article?.createdAt).format("MMM DD, YYYY")}
        </span>
      </div>
      <h1 className="text-center md:text-4xl text-2xl font-semibold text-gray-500 mt-10">
        {article?.title}
      </h1>

      <Image
        src={article?.imageUrl.trimStart() || ""}
        alt={article?.title}
        width={1080}
        height={1080}
        className="w-[100%] md:h-[500px] h-auto object-cover mt-10 rounded-lg"
      />

      <article
        dangerouslySetInnerHTML={{ __html: content }}
        className="markdown mt-10 text-muted-foreground"
      />

      <p className="text-right text-sm text-muted-foreground mt-10 border-t pt-2">
       Author: {article?.author?.username}
      </p>
    </div>
  );
};

export default ArticleDetail;
