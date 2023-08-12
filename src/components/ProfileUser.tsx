"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { TbEdit } from "react-icons/tb";
import { followUser } from "@/actions/user.actions";
import { User } from "@prisma/client";

interface Props {
  personalUser?: User | null;
  userInfo: any;
  personal: boolean;
}

const ProfileUser = ({ personalUser, userInfo, personal }: Props) => {
  const router = useRouter();
  const path = usePathname();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center sm:gap-5 gap-2">
          {/* Image */}
          <div className="relative">
            <Image
              src={userInfo.image}
              alt={userInfo.name}
              width={80}
              height={80}
              className="rounded-full object-cover w-[45px] sm:w-[80px] h-[45px] sm:h-[80px]"
            />
          </div>

          {/* Name, Username */}
          <div className="flex flex-col">
            <h1 className="sm:text-2xl text-sm text-light-1 font-extrabold tracking-wide">
              {userInfo.name}
            </h1>
            <h3 className="text-light-2 font-medium tracking-wider sm:text-lg text-xs">
              @{userInfo.username}
            </h3>
          </div>
        </div>

        {/* Edit Profile Button */}
        {personal ? (
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
        ) : (
          <div className="flex flex-row items-center justify-start gap-5">
            <Button
              type="button"
              className="bg-dark-3 hover:bg-dark-2 flex items-center px-4 sm:gap-2 gap-0 tracking-wider font-medium text-light-1"
              onClick={() =>
                startTransition(() =>
                  followUser({
                    followerId: userInfo.id,
                    followingId: personalUser?.id || "",
                    path,
                  })
                )
              }
            >
              {isPending
                ? "..."
                : userInfo.followers.find(
                    ({ followingId }: { followingId: string }) =>
                      followingId === personalUser?.id
                  )
                ? "Unfollow"
                : "Follow"}
            </Button>
          </div>
        )}
      </div>

      {/* Bio */}
      <div className="mt-5 mb-12">
        <p className="text-light-2 font-medium tracking-wider sm:text-sm text-xs leading-6">
          {userInfo.bio ? userInfo.bio : "No bio yet"}
        </p>
      </div>

      <div className="h-[2px] w-full bg-dark-3" />
    </div>
  );
};

export default ProfileUser;
