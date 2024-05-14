import firebase from "firebase/compat/app";

export type PostType = {
  id: string;
  image: string;
  name: string;
  profileImg: string;
  text: string;
  timestamp: firebase.firestore.Timestamp;
  username: string;
};
