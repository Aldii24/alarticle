import Article from "@/components/Article";
import Search from "@/components/Search";
import WhoIsSection from "@/components/WhoIsSection";

const HomePage = () => {
  return (
    <main>
      {/* SEARCH SECTION */}
      <Search />

      {/* ARTICLE SECTION */}
      <Article />

      {/* WHO IS SECTION */}
      <WhoIsSection />
    </main>
  );
};

export default HomePage;
