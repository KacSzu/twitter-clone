import News from "./news";

const NewsSection = () => {
  return (
    <div className="lg:flex-col p-3 h-screen border-l  hidden lg:flex w-[24rem]">
      <div className="sticky top-0 py-2 bg-background">
        <input
          type="text"
          placeholder="Search..."
          className="bg-muted border border-neutral-800 rounded-3xl text-sm w-full px-4 py-2"
        />
      </div>
      <News />
    </div>
  );
};

export default NewsSection;
