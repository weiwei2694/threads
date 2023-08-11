"use client";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();
  
  return (
    <article className="flex flex-row items-start justify-start gap-8 w-full">
      <div className="flex flex-row gap-4 items-center w-full">
        <Link href={`/profile/${user.id}`}>
          <Image
            src={user.image}
            alt={user.name}
            width={50}
            height={50}
            className="object-contain rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <h6 className="font-medium text-sm text-light-1">{user.name}</h6>
          <Link
            href={`/profile/${user.id}`}
            className="text-primary-500 underline font-medium tracking-wider text-xs"
          >
            @{user.username}
          </Link>
        </div>
      </div>

      <div>
        <Button
          type="button"
          onClick={() => router.push(`/profile/${user.id}`)}
          className="bg-primary-500 font-medium text-light-1 tracking-wider"
        >
          View
        </Button>
      </div>
    </article>
  );
};

export default UserCard;
