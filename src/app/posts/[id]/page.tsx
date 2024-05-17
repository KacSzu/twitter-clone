import Post from "@/components/common/post";
import CommentsSection from "@/components/postpage/comments-section";
import { app } from "@/firebase";
import { PostType } from "@/types";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router"; // Importowanie useRouter

interface IPostPage {
  params: {
    id: string;
  };
}

async function PostPage({ params }: IPostPage) {
  const { id } = params;
  const db = getFirestore(app);
  const querySnapshot = await getDoc(doc(db, "posts", id));
  const data = querySnapshot.data();
  if (!data) {
    return (
      <div className="max-w-2xl mr-auto border-muted min-h-screen">
        <div className="py-3 px-3 sticky top-0 z-50 bg-background border-b">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl">
              <HiArrowLeft />
            </Link>
            <h2 className="font-bold text-lg sm:text-xl">Post </h2>
          </div>
        </div>
        <p className="flex justify-center pt-8 font-semibold">Post not found</p>
      </div>
    );
  }

  const post: PostType = { ...data, id } as PostType;

  return (
    <div className="max-w-2xl mr-auto border-muted min-h-screen">
      <div className="py-3 px-3 sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl">
            <HiArrowLeft />
          </Link>
          <h2 className="font-bold text-lg sm:text-xl">Post</h2>
        </div>
      </div>
      <Post post={post} />
      <CommentsSection id={id} />
    </div>
  );
}

export default PostPage;
