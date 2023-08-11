"use server";

import db from "@/lib/db";

interface fetchUserParams {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
}

export const fetchUser = async ({
  id,
  name = "",
  username = "",
  email = "",
  image = "",
}: fetchUserParams) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        threads: {
          where: { parentId: null },
          include: {
            user: true,
            children: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (user) return user;

    if (!name || !username || !email) return null;

    const createUser = await db.user.create({
      data: {
        id,
        name,
        username,
        email,
        image,
      },
    });

    return createUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getActivity = async (userId: string) => {
  try {
    const userThreads = await db.thread.findMany({
      where: { userId },
      include: { children: true },
    });

    const childThreadIds = userThreads.flatMap((userThread) =>
      userThread.children.map((child) => child.id)
    );

    const replies = await db.thread.findMany({
      where: {
        id: { in: childThreadIds },
        userId: { not: userId },
      },
      include: { user: true },
    });

    return replies;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchUsers = async ({
  userId,
  searchString = "",
  take = 25,
}: {
  userId: string;
  searchString: string;
  take?: number | null;
}) => {
  try {
    const users = await db.user.findMany({
      take: take || 25,
      where: {
        id: {
          not: userId,
        },
        OR: [
          {
            username: {
              contains: searchString,
            },
          },
          {
            name: {
              contains: searchString,
            },
          },
        ],
      },
    });

    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
