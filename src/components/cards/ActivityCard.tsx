"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";

interface ThreadProps {
  id: string;
  text: string;
  parentId: string | null;
  userId: string;
  createdAt: Date;
  user: User;
}

interface Props {
  thread: ThreadProps;
}

const ActivityCard = ({ thread }: Props) => {
  const router = useRouter();

  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <article
      className="p-6 rounded-xl bg-dark-2 hover:bg-dark-3 transition-all flex flex-row items-start justify-start gap-2 cursor-pointer"
      onClick={() => router.push(`/thread/${thread.id}`)}
    >
      <div className="flex flex-row gap-4 items-start">
        <Link href={`/profile/${thread.user.id}`}>
          <Image
            src={thread.user.image}
            alt={thread.user.name}
            width={40}
            height={40}
            className="object-cover w-[40px] h-[40px] rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <h6 className="font-medium text-sm text-light-1">
            {thread.user.name}
          </h6>
          <Link
            href={`/profile/${thread.user.id}`}
            className="text-primary-500 underline font-medium tracking-wider text-xs"
          >
            @{thread.user.username}
          </Link>
        </div>
      </div>

      <div>
        <p className="text-light-1 text-sm font-light tracking-wider">
          replied to your thread.{" "}
          <span className="text-light-3">
            {client ? timeAgo(thread.createdAt) : "..."}
          </span>
        </p>
      </div>
    </article>
  );
};

export default ActivityCard;
