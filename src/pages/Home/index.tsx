import MarketSummary from "@/components/common/MarketSummary";
import BlogSwiper from "@/components/pages/home/BlogSwiper";

const Home = () => {
  return (
    <div className="min-h-[100vh]">
      <MarketSummary />
      <BlogSwiper />
      <BlogSwiper />
      <BlogSwiper />
    </div>
  );
};

export default Home;
