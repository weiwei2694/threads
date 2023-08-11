import { fetchUser, getActivity } from "@/actions/user.actions";
import ActivityCard from "@/components/cards/ActivityCard";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({
    id: user.id,
  });
  if (!userInfo) redirect("/auth/sync-user");

  const activity = await getActivity(userInfo.id);

  return (
    <section>
      <h1 className="heading-1">Activity</h1>

      <div className="mt-12">
        {activity.length > 0 ? (
          <div className="flex flex-col gap-8">
            {activity.map((activityItem) => (
              <ActivityCard key={activityItem.id} thread={activityItem} />
            ))}
          </div>
        ) : (
          <p className="no-result">No activity yet</p>
        )}
      </div>
    </section>
  );
};

export default Page;
