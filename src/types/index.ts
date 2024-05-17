import firebase from "firebase/compat/app";

export type PostType = {
  id: string;
  image?: string;
  name: string;
  profileImg?: string;
  text: string;
  timestamp?: firebase.firestore.Timestamp;
  username: string;
  userId: string;
};
export type CommentType = {
  id: string;
  commentText: string;
  name: string;
  timestamp: firebase.firestore.Timestamp;
  userImg: string;
  username: string;
};
