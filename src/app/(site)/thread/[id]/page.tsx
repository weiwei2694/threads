import { fetchThread } from "@/actions/thread.actions";
import { fetchUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ id: user.id });
  if (!userInfo) redirect("/auth/sync-user");

  const thread = await fetchThread(params.id);
  if (!thread) redirect("/");

  return (
    <section>
      <ThreadCard
        text={thread.text}
        author={thread.user}
        comments={thread.children}
        parentId={thread.id}
      />

      {/* Comment */}
      <div className="mt-12">
        <div className="py-6 border-t border-b border-dark-3">
          <Comment parentId={thread.id} author={userInfo} />
        </div>
      </div>

      {/* Reply */}
    </section>
  );
};

export default Page;
