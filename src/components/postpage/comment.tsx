"use client";

import { CommentType } from "@/types";
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useEffect, useState } from "react";
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
import { app } from "@/firebase";
import { signIn, useSession } from "next-auth/react";

interface CommentProps {
  comment: CommentType;
  commentId: string;
  postId: string;
}

const Comment = ({ comment, commentId, postId }: CommentProps) => {
  const { data: session } = useSession();
  const { commentText, name, userImg, username } = comment;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", postId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [db, postId, commentId]);

  useEffect(() => {
    setIsLiked(likes.some((like) => like.id === session?.user.id));
  }, [likes, session?.user.id]);

  async function likePost() {
    if (session && session.user && session.user.id) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            postId,
            "comments",
            commentId,
            "likes",
            session.user.id
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            postId,
            "comments",
            commentId,
            "likes",
            session.user.id
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn("github");
    }
  }

  return (
    <div className="border-b border-muted hover:bg-muted/20">
      <div className="flex p-3 pl-8">
        <img
          src={userImg}
          alt="user image"
          className="w-9 h-9 mr-4 rounded-full cursor-pointer hover:brightness-95"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <h4 className="font-bold text-sm truncate">{name}</h4>
              <span className="text-xs truncate">@{username}</span>
            </div>
            <HiDotsHorizontal className="text-sm" />
          </div>
          <p className="text-sm my-3">{commentText}</p>
          <div className="flex items-center">
            {isLiked ? (
              <HiHeart
                onClick={likePost}
                className="h-8 w-8 p-2 text-red-500 hover:bg-red-900/30 rounded-full cursor-pointer transition duration-300"
              />
            ) : (
              <HiOutlineHeart
                onClick={likePost}
                className="h-8 w-8 p-2 hover:text-red-500 hover:bg-red-900/30 rounded-full cursor-pointer transition duration-300"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`text-sm ${
                  isLiked ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
