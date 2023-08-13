import ThreadCard from "@/components/cards/ThreadCard";

import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/actions/user.actions";
import { fetchThreads } from "@/actions/thread.actions";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({
    id: user.id,
  });
  if (!userInfo) redirect("/auth/sync-user");

  const threads = await fetchThreads();

  return (
    <section>
      <div className="flex flex-col gap-8">
        {threads?.length > 0 ? (
          <>
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id}
                userId={userInfo.id}
                parentId={thread.id}
                author={thread.user}
                text={thread.text}
                comments={thread.children}
                likes={thread.likes}
                isComment
              />
            ))}
          </>
        ) : (
          <p className="no-result">No Results</p>
        )}
      </div>
    </section>
  );
}
