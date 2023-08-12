"use client";

import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineComment } from "react-icons/ai";

interface Comments {
  id: string;
  parentId: string | null;
  text: string;
  userId: string;
  user: User;
}

interface Props {
  author: User;
  text: string;
  comments: Comments[];
  parentId: string;
  isComment?: boolean;
}

const ThreadCard = ({ author, text, parentId, comments, isComment }: Props) => {
  const router = useRouter();

  return (
    <article className="p-7 rounded-xl bg-dark-2 flex flex-col gap-6">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Image
              src={author.image}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full object-cover w-[40px] h-[40px]"
            />
          </div>

          <div className="w-[3px] h-full bg-dark-3 rounded-full" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Link href={`/profile/${author.id}`}>
              <h3 className="font-medium text-light-1 tracking-wider">
                {author.name}
              </h3>
            </Link>
            <p className="text-light-2 font-light text-sm tracking-wider leading-6">
              {text}
            </p>
          </div>

          <div className="flex gap-3">
            <Link href={`/thread/${parentId}`} className="icon-card">
              <AiOutlineComment />
            </Link>
          </div>
        </div>
      </div>

      {isComment && comments.length > 0 && (
        <div
          className="flex gap-3 items-center cursor-pointer w-fit group"
          onClick={() => router.push(`/thread/${parentId}`)}
        >
          <div className="flex row">
            {comments.slice(0, 3).map((childItem, index) => (
              <div
                key={childItem.id}
                className={`${index !== 0 && "-ms-2"} rounded-full`}
              >
                <Image
                  src={childItem.user.image}
                  alt={childItem.user.name}
                  width={20}
                  height={20}
                  className="rounded-full object-cover w-[20px] h-[20px]"
                />
              </div>
            ))}
          </div>

          <p className="text-xs font-normal tracking-wider text-light-2 underline group-hover:text-primary-500 transition-all">
            <span>{comments.length}</span> replies
          </p>
        </div>
      )}
    </article>
  );
};

export default ThreadCard;
