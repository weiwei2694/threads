import { fetchUser, fetchUsers } from "@/actions/user.actions";
import Searchbar from "@/components/Searchbar";
import UserCard from "@/components/cards/UserCard";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { q: string }}) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser({ id: user.id });
    if (!userInfo) redirect('/auth/sync-user');

    const users = await fetchUsers({
      userId: user.id,
      searchString: searchParams.q
    })

  return (
    <section>
        <h1 className="heading-1">Search</h1>

        <div className="my-8">
          <Searchbar />
        </div>

        <div className="mt-12">
            <div className="flex flex-col gap-8">
              {users.length > 0 ? (
                <>
                  {users.map(user => (
                    <UserCard user={user} />
                  ))}
                </>
              ) : (
                <p className="no-result">No Results</p>
              )}
            </div>
        </div>
    </section>
  )
}

export default Page