"use client";

import { app } from "@/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./comment";
import { CommentType } from "@/types";

interface ICommentsSection {
  id: string;
}

const CommentsSection = ({ id }: ICommentsSection) => {
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs);
    });
    return () => unsubscribe();
  }, [db, id]);
  return (
    <div>
      {comments.map((comment, i) => (
        <Comment
          key={i}
          comment={comment.data() as CommentType}
          commentId={comment.id}
          postId={id}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
