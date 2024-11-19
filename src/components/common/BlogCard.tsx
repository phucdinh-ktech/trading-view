interface BlogSwiperProps {
  thumbnail: string;
  title: string;
  description: string;
  actor: string;
  time: string;
}
function BlogCard(props: BlogSwiperProps) {
  const { thumbnail, title, description, actor, time } = props;
  return (
    <div className="flex flex-col justify-between gap-[12px] rounded-[10px] hover:bg-[#F0F3FA] duration-300 h-[400px] overflow-hidden p-[10px]">
      <img
        src={thumbnail}
        alt="thumbnail-blog"
        className="w-full h-[50%] rounded-[10px] object-cover"
      />
      <div className="flex flex-col gap-[12px]">
        <h3 className="text-[18px] font-bold cursor-pointer hover:underline hover:text-[#C74830] duration-300">
          {title}
        </h3>
        <p className="text-[16px]">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px]">by {actor}</p>
            <p className="text-[14px] text-[#999]">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
