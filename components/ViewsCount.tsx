const ViewsCount = ({ article }: { article: any }) => {
  return (
    <div className="flex items-center text-xs text-foreground bg-indigo-500 rounded-full px-4 py-2">
      <div className="relative w-3 h-3 bg-red-400 rounded-full mr-2 ">
        <div className="absolute w-3 h-3 bg-red-400 rounded-full top-0 left-0 animate-ping"></div>
      </div>
      <div className="flex gap-1 items-center">
        <span className="font-semibold">{article?.views}</span>
        <p>Views</p>
      </div>
    </div>
  );
};

export default ViewsCount;
