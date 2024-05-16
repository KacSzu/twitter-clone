"use client";
import { app } from "@/firebase";
import { PostType } from "@/types";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CommentModal = ({ post }: { post: PostType }) => {
  const { id, image, name, profileImg, text, username, userId } = post;
  const [replyValue, setReplyValue] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  async function sendReply() {
    if (!session) return null;
    addDoc(collection(db, "posts", id, "comments"), {
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      commentText: replyValue,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setReplyValue("");
        router.push(`/posts/${id}`);
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="p-4 min-w-[350px] sm:w-[500px] lg:w-[600px]">
      <div className="p-2 flex items-center space-x-1 relative ">
        <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-muted" />
        <img
          src={profileImg as string}
          alt="user image"
          className="w-11 h-11 mr-4 rounded-full  hover:brightness-95"
        />
        <div className="pl-2 space-x-1 flex items-center">
          <h4 className="font-bold text-sm sm:text-base truncate">{name}</h4>
          <span className="text-xs sm:text-sm truncate">@{username}</span>
        </div>
      </div>
      <p className="text-sm sm:text-base ml-16 mb-2">{text}</p>
      <span className="ml-16 mb-2 text-xs text-muted-foreground">
        Replying to <span className="text-sky-500">@{username} </span>{" "}
      </span>
      <div className="flex p-3 space-x-3">
        <img
          src={session?.user?.image as string}
          alt="user image"
          className="w-11 h-11 mr-4 rounded-full  hover:brightness-95"
        />
        <div className="flex-1 divide-y divide-muted">
          <textarea
            value={replyValue}
            onChange={(e) => setReplyValue(e.target.value)}
            autoFocus
            className="w-full  tracking-wide min-h-[50px] text-foreground bg-black border-none outline-none ring-0"
            rows={2}
            placeholder="Post your reply"
          />
          <div className="flex items-center  justify-end pt-2.5">
            <button
              onClick={sendReply}
              disabled={replyValue.trim() === ""}
              className="bg-sky-500 text-foreground hover:bg-sky-500/90 px-5
            rounded-full py-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
