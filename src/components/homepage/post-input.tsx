"use client";

import { app } from "@/firebase";
import { cn } from "@/lib/utils";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa6";
const PostInput = () => {
  const { data: session } = useSession();
  const imagePickRef = useRef<HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postValue, setPostValue] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [isPostsLoading, setIsPostLoading] = useState<boolean>(false);
  const db = getFirestore(app);
  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }

    function uploadImageToStorage() {
      if (!selectedFile) return;
      setIsImageUploading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + selectedFile?.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error(error);
          setIsImageUploading(false);
          setImageFileUrl(null);
          setSelectedFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setIsImageUploading(false);
          });
        }
      );
    }
  }, [selectedFile]);

  function addImageToPost(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }
  }
  async function handleCreateNewPost() {
    if (!session) return null;
    setIsPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.id,
      name: session.user.name,
      username: session.user.username,
      image: imageFileUrl,
      text: postValue,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    setIsPostLoading(false);
    setPostValue("");
    setImageFileUrl(null);
    setSelectedFile(null);
  }
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
          onChange={(e) => setPostValue(e.target.value)}
          value={postValue}
          className="w-full  tracking-wide min-h-[50px] text-foreground bg-background border-none outline-none ring-0"
          rows={2}
          placeholder="What is happening?!"
        />
        {selectedFile && (
          <img
            src={imageFileUrl as string}
            alt="uploaded image"
            className={cn(
              "w-full  rounded-xl object-fit cursor-poiner",
              isImageUploading && "animate-pulse"
            )}
          />
        )}
        <div className=" flex items-center justify-between pt-2">
          <HiOutlinePhotograph
            onClick={() => imagePickRef?.current?.click()}
            className="h-10 w-10 p-2  text-sky-500 hover:bg-sky-900/30 rounded-full cursor-pointer"
          />
          <input
            onChange={addImageToPost}
            type="file"
            className="hidden"
            ref={imagePickRef}
            accept="image/*"
          />
          <button
            disabled={
              postValue.trim() === "" || isPostsLoading || isImageUploading
            }
            onClick={handleCreateNewPost}
            className="bg-sky-500 text-foreground hover:bg-sky-500/90 px-5  rounded-full py-1.5 font-semibold disabled:opacity-50"
          >
            {isPostsLoading ? (
              <div className="px-1.5 py-0.5">
                <FaSpinner className="animate-spin text-xl " />
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
