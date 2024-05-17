"use client";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

interface IProvidersSignUpButton {
  icon: ReactNode;
  label: string;
  provider: string;
}

const ProvidersAuthButton = ({
  icon,
  label,
  provider,
}: IProvidersSignUpButton) => {
  return (
    <button
      onClick={() => signIn(provider)}
      className="flex gap-4 rounded-full hover:bg-muted/20  text-foreground text-base items-center xl:mr-1.5 cursor-pointer p-3"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
};

export default ProvidersAuthButton;
