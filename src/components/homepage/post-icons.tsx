"use client";
import { app } from "@/firebase";
import { cn } from "@/lib/utils";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
const PostIcons = ({ id }: { id: string }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const { data: session } = useSession();
  const db = getFirestore(app);

  async function likePost() {
    if (session && session.user && session.user.id) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.id));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.id), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn("github");
    }
  }

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.id) !== -1);
  }, [likes, session?.user.id]);

  return (
    <div className="flex gap-2 p-2 ">
      <HiOutlineChat className="h-8 w-8 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300 " />
      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className="h-8 w-8 p-2  text-red-500 hover:bg-red-900/30 rounded-full cursor-pointer transition duration-300"
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className="h-8 w-8 p-2  hover:text-red-500 hover:bg-red-900/30 rounded-full cursor-pointer transition duration-300"
          />
        )}
        {likes.length > 0 && (
          <span
            className={cn(
              "text-sm text-muted-foreground",
              isLiked && "text-red-500"
            )}
          >
            {likes.length}
          </span>
        )}
      </div>

      <HiOutlineTrash className="h-8 w-8 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300" />
    </div>
  );
};

export default PostIcons;
