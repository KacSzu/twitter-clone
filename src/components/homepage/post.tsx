import { PostType } from "@/types";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import PostIcons from "./post-icons";
const Post = ({ post }: { post: PostType }) => {
  const { id, image, name, profileImg, text, username } = post;
  console.log(post);
  return (
    <div className="flex p-3 border-b border-muted hover:bg-muted/20 ">
      <img
        src={profileImg as string}
        alt="user image"
        className="w-11 h-11 mr-4 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{name}</h4>
            <span className="text-xs truncate">@{username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <Link href={`/posts/${id}`}>
          <p className="text-sm my-3">{text}</p>
        </Link>
        {image && (
          <Link href={`/posts/${id}`}>
            <img src={image} className="rounded-xl mr-2" />
          </Link>
        )}
        <PostIcons id={post.id} />
      </div>
    </div>
  );
};

export default Post;
