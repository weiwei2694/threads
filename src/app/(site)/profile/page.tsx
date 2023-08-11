import { fetchUser } from "@/actions/user.actions";
import ProfileUser from "@/components/ProfileUser";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ id: user.id });
  if (!userInfo) redirect("/auth/sync-user");

  return (
    <div>
      <ProfileUser user={userInfo} />
    </div>
  );
};

export default Page;
