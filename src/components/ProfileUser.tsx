"use client"
import { useRouter } from "next/navigation";

import { User } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { TbEdit } from "react-icons/tb";

const ProfileUser = ({ user }: { user: User }) => {
    const router = useRouter()

  return (
    <header className="relative flex flex-col">
      <div className="flex flex-row items-center gap-5">
        {/* Image */}
        <div className="relative">
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full object-contain"
          />
        </div>

        {/* Name, Username */}
        <div className="flex flex-col">
          <h1 className="heading-1">{user.name}</h1>
          <h3 className="text-light-3 font-medium tracking-wider text-lg">
            @{user.username}
          </h3>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-5 mb-12">
        <p className="text-light-2 font-medium tracking-wider text-sm leading-6">
          {user.bio ? user.bio : "No bio yet"}
        </p>
      </div>

      {/* Edit Profile Button - Absolute */}
      <div className="absolute top-0 right-0">
        <Button type="button" className="bg-dark-3 hover:bg-dark-2 flex items-center px-4 gap-2 tracking-wider font-medium text-light-1" onClick={() => router.push('/profile/edit')}>
            <span className="text-xl text-primary-500">
                <TbEdit />
            </span>
            Edit
        </Button>
      </div>

      <div className="h-[2px] w-full bg-dark-3" />
    </header>
  );
};

export default ProfileUser;
