"use client";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface Props {
  user: User;
}

function Topbar({ user }: Props) {
  const router = useRouter();

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <p className="font-bold text-2xl text-light-1">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/auth/sign-in")}>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <div>
          <Link
            className="flex flex-row items-center gap-2 cursor-pointer"
            href={`/profile/${user.id}`}
          >
            <Image
              src={user.image}
              alt={user.name}
              width={50}
              height={50}
              className="object-cover rounded-lg w-[50px] h-[50px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
