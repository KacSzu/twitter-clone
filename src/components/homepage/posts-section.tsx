import { app } from "@/firebase";
import { PostType } from "@/types";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Post from "../common/post";

const PostsSection = async () => {
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
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
  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsSection;
