import { fetchUser } from "@/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: any = await fetchUser({ id: user.id });
  if (!userInfo) redirect("/auth/sync-user");

  return (
    <section>
      <AccountProfile user={userInfo} />
    </section>
  );
};

export default Page;
