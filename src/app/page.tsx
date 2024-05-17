import PostInput from "@/components/homepage/post-input";
import PostsSection from "@/components/homepage/posts-section";

export default async function Home() {
  return (
    <div className="max-w-2xl mr-auto ">
      <div className="py-3 px-3 sticky top-0 z-50 bg-background  border-b ">
        <h2 className="font-bold text-lg sm:text-xl">Home</h2>
      </div>
      <PostInput />
      <PostsSection />
    </div>
  );
}
