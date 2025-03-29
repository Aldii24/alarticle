import { getArticleBySearh } from "@/actions/article.action";
import SearchListArticle from "@/components/SearchListArticle";
import Image from "next/image";

const SearchPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const decodedSlug = decodeURIComponent(slug);

  const articles = await getArticleBySearh(decodedSlug);

  return (
    <div className="md:px-16 px-4 py-10 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-500">
        Result for:{" "}
        <span className="capitalize">
          {decodedSlug} ({articles?.length})
        </span>
      </h2>

      {articles?.length === 0 && (
        <div className="flex flex-col items-center justify-center mx-auto mt-10">
          <Image
            src="/not-found.png"
            alt="not-found"
            width={500}
            height={500}
            className=""
          />
          <h2 className="md:text-3xl text-xl font-semibold text-gray-500">
            Sorry we couldn&apos;t find any results
          </h2>
        </div>
      )}
      {articles?.map((article) => (
        <SearchListArticle articles={article} key={article?.id} />
      ))}
    </div>
  );
};

export default SearchPage;
