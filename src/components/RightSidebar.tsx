import { currentUser } from "@clerk/nextjs";
import UserCard from "./cards/UserCard";
import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { redirect } from "next/navigation";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ id: user.id });
  if (!userInfo) redirect("/auth/sync-user");

  const users = await fetchUsers({
    searchString: "",
    userId: userInfo.id,
    take: 4,
  });

  return (
    <section className="rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="font-medium tracking-wider text-light-1 text-xl">
          Suggested Users
          <div className="mt-12">
            <div className="flex flex-col gap-8">
              {users.length > 0 ? (
                <>
                  {users.map((user) => (
                    <UserCard user={user} />
                  ))}
                </>
              ) : (
                <p className="no-result">No users yet</p>
              )}
            </div>
          </div>
        </h3>
      </div>
    </section>
  );
}

export default RightSidebar;
