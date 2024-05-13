import { Session } from "next-auth";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
interface IUserProfile {
  session: Session;
}

const UserProfile = ({ session }: IUserProfile) => {
  const { image, email, name } = session.user;
  return (
    <div className="flex gap-4 rounded-lg hover:bg-muted/20  text-muted-foreground text-sm items-center xl:mr-2 cursor-pointer p-3">
      <Image
        className="rounded-full"
        width={48}
        height={48}
        src={image as string}
        alt="user image"
      />
      <div className="hidden xl:inline">
        <h4 className="font-bold">{name}</h4>
        <p className="text-xs">{email}</p>
      </div>
      <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
    </div>
  );
};

export default UserProfile;
