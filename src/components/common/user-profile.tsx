"use client";
import { Session } from "next-auth";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";
interface IUserProfile {
  session: Session;
}

const UserProfile = ({ session }: IUserProfile) => {
  const { image, email, name, username } = session.user;
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-4 rounded-full hover:bg-muted/60 transition-all duration-300 text-muted-foreground text-sm items-center xl:mr-2 cursor-pointer p-3">
          <Image
            className="rounded-full"
            width={48}
            height={48}
            src={image as string}
            alt="user image"
          />
          <div className="hidden xl:inline">
            <h4 className="font-bold text-foreground">{name}</h4>
            <p className="text-xs">@{username}</p>
          </div>
          <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="shadow-xl font-bold text-sm shadow-custom-white flex w-fit justify-start pr-8 ">
        <button onClick={() => signOut()}>Log out @{username}</button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
