"use client";

import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

const PostInput = () => {
  const { data: session } = useSession();
  const imagePickRef = useRef<HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }

    function uploadImageToStorage() {
      if (!selectedFile) return;
      setIsUploading(true);
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
          setIsUploading(false);
          setImageFileUrl(null);
          setSelectedFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setIsUploading(false);
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
        {selectedFile && (
          <img
            src={imageFileUrl as string}
            alt="uploaded image"
            className="w-full max-h-[250px] object-cover cursor-poiner"
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
          <button className="bg-sky-500 text-foreground hover:bg-sky-500/90 px-5  rounded-full py-1.5 font-semibold disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
