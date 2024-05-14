import PostInput from "@/components/homepage/post-input";
import PostsSection from "@/components/homepage/posts-section";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div className="py-3 px-3 sticky top-0 z-50 bg-background  border-b ">
        <h2 className="font-bold text-lg sm:text-xl">Home</h2>
      </div>
      <PostInput />
      <PostsSection />
    </div>
  );
}
