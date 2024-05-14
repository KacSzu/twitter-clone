"use client";
import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";
const PostIcons = () => {
  return (
    <div className="flex gap-2 p-2 ">
      <HiOutlineChat className="h-10 w-10 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300 " />
      <HiOutlineHeart className="h-10 w-10 p-2  hover:text-red-500 hover:bg-red-900/30 rounded-full cursor-pointer transition duration-300" />
      <HiOutlineTrash className="h-10 w-10 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300" />
    </div>
  );
};

export default PostIcons;
