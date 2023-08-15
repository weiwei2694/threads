import { fetchUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      username: user.username?.toLowerCase(),
      email: user.emailAddresses[0].emailAddress,
      image: user.imageUrl,
    });

    if (userInfo) redirect("/");

    return null;
  } catch (error) {
    console.error("An error occurred:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
};

export default Page;
