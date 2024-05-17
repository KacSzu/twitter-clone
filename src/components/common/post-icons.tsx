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
import Modal from "./modal";
import { PostType } from "@/types";
import CommentModal from "../homepage/comment-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const PostIcons = ({ post }: { post: PostType }) => {
  const { id, image, name, profileImg, text, username, userId } = post;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const { data: session } = useSession();
  const db = getFirestore(app);
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.id) !== -1);
  }, [likes, session?.user.id]);
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

  async function deletePost() {
    if (session?.user?.id === userId) {
      await deleteDoc(doc(db, "posts", id))
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="flex gap-2 p-2 ">
      {session ? (
        <Modal>
          <Modal.Open opens="comment-modal">
            <div className="flex items-center">
              <HiOutlineChat className="h-8 w-8 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300 " />
              {comments.length > 0 && (
                <span className={cn("text-sm text-muted-foreground")}>
                  {comments.length}
                </span>
              )}
            </div>
          </Modal.Open>
          <Modal.Window name="comment-modal">
            <CommentModal onCloseModal={close} post={post} />
          </Modal.Window>
        </Modal>
      ) : (
        <div className="flex items-center">
          <HiOutlineChat
            onClick={() => signIn("github")}
            className="h-8 w-8 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300 "
          />
          {comments.length > 0 && (
            <span className={cn("text-sm text-muted-foreground")}>
              {comments.length}
            </span>
          )}
        </div>
      )}
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
      {session?.user?.id === userId && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <HiOutlineTrash className="h-8 w-8 p-2  hover:text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer transition duration-300" />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deletePost}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default PostIcons;
