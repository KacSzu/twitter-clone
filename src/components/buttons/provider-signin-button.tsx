"use client";
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
  console.log(provider);
  return (
    <button className="bg-foreground text-background rounded-full py-2 flex items-center justify-center w-[200px] gap-3 ">
      <span className="text-xl">{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
};

export default ProvidersAuthButton;
