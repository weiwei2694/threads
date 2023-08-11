"use client";
import { useRouter } from "next/navigation";

import { User } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { TbEdit } from "react-icons/tb";

const ProfileUser = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center sm:gap-5 gap-2">
          {/* Image */}
          <div className="relative">
            <Image
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full object-contain w-[45px] sm:w-[80px] h-[45px] sm:h-[80px]"
            />
          </div>

          {/* Name, Username */}
          <div className="flex flex-col">
            <h1 className="sm:text-2xl text-sm text-light-1 font-extrabold tracking-wide">
              {user.name}
            </h1>
            <h3 className="text-light-2 font-medium tracking-wider sm:text-lg text-xs">
              @{user.username}
            </h3>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button
          type="button"
          className="bg-dark-3 hover:bg-dark-2 flex items-center px-4 sm:gap-2 gap-0 tracking-wider font-medium text-light-1"
          onClick={() => router.push("/profile/edit")}
        >
          <span className="sm:text-xl text-base text-primary-500">
            <TbEdit />
          </span>
          <span className="hidden sm:block">Edit</span>
        </Button>
      </div>

      {/* Bio */}
      <div className="mt-5 mb-12">
        <p className="text-light-2 font-medium tracking-wider sm:text-sm text-xs leading-6">
          {user.bio ? user.bio : "No bio yet"}
        </p>
      </div>

      <div className="h-[2px] w-full bg-dark-3" />
    </div>
  );
};

export default ProfileUser;
