"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";

const PostInput = () => {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="flex border-b border-muted p-3 space-x-3 w-full">
      <img
        src={session.user.image as string}
        alt="user image"
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-muted">
        <textarea
          className="w-full  tracking-wide min-h-[50px] text-foreground bg-background border-none outline-none ring-0"
          rows={2}
          placeholder="What is happening?!"
        />
        <div className=" flex items-center justify-between pt-2">
          <HiOutlinePhotograph className="h-10 w-10 p-2  text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer" />
          <button className="bg-sky-500 text-foreground hover:bg-sky-500/90 px-5  rounded-full py-1.5 font-semibold disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
