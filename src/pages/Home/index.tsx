import MarketSummary from "@/components/common/MarketSummary";
import BlogSwiper from "@/components/pages/home/BlogSwiper";

const Home = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto min-h-[100vh] pl-[20px]">
        <MarketSummary />
        <BlogSwiper />
        <BlogSwiper />
        <BlogSwiper />
      </div>
    </>
  );
};

export default Home;
