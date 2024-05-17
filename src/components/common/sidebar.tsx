"use client";
import Image from "next/image";
import Link from "next/link";
import { HiHome } from "react-icons/hi2";
import ProvidersAuthButton from "../buttons/provider-signin-button";
import { FaGithub } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import UserProfile from "./user-profile";
const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col p-3 justify-between h-screen ">
      <div className="flex flex-col justify-between">
        <Link href="/home">
          <Image
            src="/twitterlogo.png"
            alt="twitterlogo"
            width={64}
            height={64}
          />
        </Link>
        <Link href="/home" className="flex items-center gap-3 p-3">
          <HiHome className="h-6 w-6" />
          <span className="font-semibold text-2xl hidden xl:inline text-white">
            Home
          </span>
        </Link>
        <div className="hidden xl:inline">
          <ProvidersAuthButton
            label="Sign in with GitHub"
            provider="github"
            icon={<FaGithub />}
          />
          <button onClick={() => signOut()}>sign out</button>
        </div>
      </div>
      {session && <UserProfile session={session} />}
    </div>
  );
};

export default Sidebar;
