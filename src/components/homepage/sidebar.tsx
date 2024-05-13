import Image from "next/image";
import Link from "next/link";
import { HiHome } from "react-icons/hi2";
import ProvidersAuthButton from "../buttons/provider-signin-button";
import { FaGithub } from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
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
      </div>
    </div>
  );
};

export default Sidebar;
