import { fetchThread } from "@/actions/thread.actions";
import { fetchUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ id: user.id });
  if (!userInfo) redirect("/auth/sync-user");

  const thread = await fetchThread(params.id);
  if (!thread) redirect('/');

  return (
    <section>
      <ThreadCard text={thread.text} author={thread.user} comments={thread.children} parentId={thread.id} />

      {/* Comment */}

      {/* Reply */}
    </section>
  );
};

export default Page;
