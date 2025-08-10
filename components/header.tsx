import Image from "next/image";
import MonsterCarLogo from "@/public/monstercat-logo.webp";
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <div className="flex items-center justify-between mx-[35px] py-[24px] px-[32px] bg-transparent text-white">
        <Image
          className="size-12"
          src={MonsterCarLogo}
          alt="Monster Cat Logo"
        />
        <Menu className="size-8 text-white" />
      </div>
    </header>
  );
}

export { Header };
