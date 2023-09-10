import { fetchUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser({
    id: user.id,
    name: `${user.firstName} ${user.lastName && user.lastName}`,
    username: user.username?.toLowerCase(),
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
  });

  if (userInfo) redirect("/");

  return null;
};

export default Page;
