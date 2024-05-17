"use client";

import { useEffect, useState } from "react";
import { app } from "@/firebase";
import { PostType } from "@/types";
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Post from "../common/post";

const PostsSection = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data: PostType[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const postData: PostType = {
          id: doc.id,
          image: docData.image,
          name: docData.name,
          profileImg: docData.profileImg,
          text: docData.text,
          username: docData.username,
          userId: docData.userId,
        };
        data.push(postData);
      });
      setPosts(data);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsSection;
