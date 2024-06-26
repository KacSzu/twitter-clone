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
        <Link href="/">
          <Image
            src="/twitterlogo.png"
            alt="twitterlogo"
            width={64}
            height={64}
          />
        </Link>

        <Link
          href="/"
          className="flex items-center justify-center xl:justify-start gap-3 p-3 transition-all hover:bg-muted/60 duration-300 rounded-full"
        >
          <HiHome className="h-6 w-6" />
          <span className="font-semibold text-2xl hidden xl:inline text-white">
            Home
          </span>
        </Link>
      </div>
      {session ? (
        <UserProfile session={session} />
      ) : (
        <div className="hidden xl:inline">
          <ProvidersAuthButton
            label="Sign in with GitHub"
            provider="github"
            icon={<FaGithub />}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
