import { fetchUser } from "@/actions/user.actions";
import ProfileUser from "@/components/ProfileUser";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadCard from "@/components/cards/ThreadCard";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: any = await fetchUser({ id: user.id });
  if (!userInfo) redirect("/auth/sync-user");

  return (
    <section>
      <ProfileUser userInfo={userInfo} personal={user.id === userInfo.id} />

      <div className="mt-8">
        <Tabs defaultValue="threads">
          <TabsList className="tabs-list">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="tabs-trigger"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={26}
                  height={26}
                  className="object-contain"
                />
                <p className="max-sm:hidden text-light-1">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-3 px-2 py-1 text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads">
            <div className="mt-12">
              {userInfo.threads.length > 0 ? (
                <div className="flex flex-col gap-8">
                  {userInfo.threads.map((thread: any) => (
                    <ThreadCard
                      key={thread.id}
                      likes={thread.likes}
                      author={thread.user}
                      userId={userInfo.id}
                      text={thread.text}
                      parentId={thread.id}
                      isComment
                      comments={thread.children}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-result">No threads yet</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
