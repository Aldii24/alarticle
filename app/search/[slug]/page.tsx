const SearchPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const decodedSlug = decodeURIComponent(slug);

  return <div>{decodedSlug}</div>;
};

export default SearchPage;
