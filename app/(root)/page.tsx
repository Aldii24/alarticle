import Article from "@/components/Article";
import Search from "@/components/Search";
import WhoIsSection from "@/components/WhoIsSection";

const HomePage = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      <Search />
      <Article />
      <WhoIsSection />
    </main>
  );
};

export default HomePage;
