import { User, Thread } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineComment } from "react-icons/ai"

interface Props {
  author: User;
  text: string;
  comments: Thread[];
  parentId: string;
  isComment: boolean; 
}

const ThreadCard = ({
  author,
  text,
  parentId,
  comments,
  isComment
}: Props) => {
  return (
    <article className="p-7 rounded-xl bg-dark-2">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-11 h-11">
            <Image
              src={author.image}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </div>

          <div className="w-[3px] h-full bg-dark-3 rounded-full" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Link href={`/profile/${author.id}`}>
              <h3 className="font-medium text-light-1 tracking-wider">{author.name}</h3>
            </Link>
            <p className="text-light-2 font-light text-sm tracking-wider leading-6">{text}</p>
          </div>

          <div className="flex gap-3">
            <Link href={`/thread/${parentId}`} className="icon-card">
              <AiOutlineComment />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ThreadCard