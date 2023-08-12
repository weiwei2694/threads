import "../globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Topbar from "@/components/Topbar";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import Bottombar from "@/components/Bottombar";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "create your first thread",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser()
  if (!user) return null;

  const userInfo = await fetchUser({ id: user.id })
  if (!userInfo) redirect('/auth/sync-user')

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <Topbar user={userInfo} />

          <main className="flex flex-row">
            <LeftSidebar userInfo={userInfo} />

            <section className="main-container">
              <div className="max-w-4xl w-full">{children}</div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
