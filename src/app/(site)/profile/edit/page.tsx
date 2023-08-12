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
        <h1 className="heading-1">Edit Profile</h1>

        <div className="mt-12">
          <div className="p-6 rounded-xl bg-dark-2">
            <AccountProfile user={userInfo} />
          </div>
        </div>
    </section>
  )
}

export default Page