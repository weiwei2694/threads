import { fetchUser } from "@/actions/user.actions";
import PostThread from "@/components/forms/PostThread"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser()
    if (!user) return null;

    const userInfo = await fetchUser({
        id: user.id
    })
    if (!userInfo) redirect('/auth/sync-user')

  return (
    <section>
        <h1 className="heading-1">Create Thread</h1>

        <div className="mt-12">
            <PostThread userId={userInfo.id} />
        </div>
    </section>
  )
}

export default Page