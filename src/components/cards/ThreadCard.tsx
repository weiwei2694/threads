"use client";
import { Like } from "@prisma/client";

import {
  useState,
  useTransition,
  experimental_useOptimistic as useOptimistic,
  useEffect,
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCheck, AiOutlineComment } from "react-icons/ai";
import { deleteThread, likeThread } from "@/actions/thread.actions";

interface CommentsProps {
  id: string;
  parentId: string | null;
  text: string;
  userId: string;
  user: User;
}

interface Props {
  author: User;
  userId: string;
  text: string;
  comments: CommentsProps[];
  parentId: string;
  likes: Like[];
  isProfile?: boolean;
  isComment?: boolean;
}

const ThreadCard = ({
  author,
  userId,
  text,
  parentId,
  comments,
  likes,
  isProfile,
  isComment,
}: Props) => {
  const router = useRouter();
  const path = usePathname();

  const [isPending, startTransition] = useTransition();
  const [mutation, setMutation] = useState(false); // mutation for share feature
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, newLike: Like) => {
      const exist = state.find(
        (like) => like.userId === userId && like.threadId === parentId
      );
      if (exist) return state.filter((like) => like !== exist);
      return [...state, newLike];
    }
  );

  // delete feature
  const handleDeleteThread = async () => {
    const hasConfirmed = confirm("are you sure to delete this thread?");

    if (hasConfirmed) await deleteThread({ id: parentId, path });
  };

  // share feature
  const handleShareThread = (url: string) => {
    setMutation(true);
    const domain = process.env.NEXT_PUBLIC_DOMAIN;

    navigator.clipboard.writeText(`${domain}${url}`);
    setTimeout(() => setMutation(false), 2000);
  };

  // like feature
  const handleLikeThread = ({
    threadId,
    userId,
  }: {
    threadId: string;
    userId: string;
  }) => {
    addOptimisticLike({
      id: Math.random().toString(),
      threadId,
      userId,
    });

    startTransition(() =>
      likeThread({
        threadId,
        userId,
        path,
      })
    );
  };

  return (
    <article className="py-2 md:p-7 rounded-none sm:rounded-xl bg-dark-2 flex flex-col gap-6 relative">
      <div className="flex flex-row gap-5">
        <div className="relative flex flex-col items-center gap-3">
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
                {author.username}
              </h3>
            </Link>
            <p className="text-light-2 font-light text-sm tracking-wider leading-6">
              {text}
            </p>
          </div>

          <div className="flex flex-row items-center gap-4">
            {/* Comment */}
            <Link href={`/thread/${parentId}`} className="icon-card">
              <AiOutlineComment />
            </Link>

            {/* Like */}
            <button
              type="button"
              onClick={() => handleLikeThread({ userId, threadId: parentId })}
            >
              {optimisticLikes.find(
                (like) => like.userId === userId && like.threadId === parentId
              ) ? (
                <Image
                  src="/assets/heart-filled.svg"
                  alt="Like"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] object-contain"
                />
              ) : (
                <Image
                  src="/assets/heart-gray.svg"
                  alt="Like"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] object-contain"
                />
              )}
            </button>

            {/* Share */}
            <button
              disabled={mutation}
              type="button"
              onClick={() =>
                !mutation &&
                handleShareThread(
                  `/thread/${parentId}/?utm_source=thread_web_copy_link`
                )
              }
            >
              {mutation ? (
                <span className="icon-card">
                  <AiOutlineCheck />
                </span>
              ) : (
                <Image
                  src="/assets/share.svg"
                  alt="Share"
                  width={25}
                  height={25}
                  className="object-contain w-[25px] h-[25px]"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {isComment && (
        <div
          className="flex gap-3 items-center cursor-pointer w-fit"
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

          <p className="text-xs font-normal tracking-wider text-light-2">
            {comments.length > 0 && <span>{comments.length} replies •</span>}{" "}
            <span>{optimisticLikes.length}</span> likes
          </p>
        </div>
      )}

      {/* isProfile | Delete Thread Feature */}
      {isProfile && (
        <div className="absolute top-6 right-6">
          <button type="button" onClick={handleDeleteThread}>
            <Image
              src="/assets/delete.svg"
              alt="Delete"
              width={23}
              height={23}
              className="object-contain"
            />
          </button>
        </div>
      )}

      <div className="h-[1px] w-full bg-[#3A3A40] block md:hidden" />
    </article>
  );
};

export default ThreadCard;
