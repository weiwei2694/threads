"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

interface createThreadProps {
  userId: string;
  text: string;
  parentId: string | null;
  path: string;
}

export const createThread = async ({
  userId,
  text,
  parentId,
  path,
}: createThreadProps) => {
  try {
    const thread = await db.thread.create({
      data: {
        userId,
        text,
        parentId,
      },
    });

    revalidatePath(path);

    return thread;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchThreads = async () => {
  try {
    const threads = await db.thread.findMany({
      where: { parentId: null },
      include: {
        user: true,
        likes: true,
        children: {
          include: {
            user: true,
          },
        },
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchThread = async (id: string) => {
  try {
    const thread = await db.thread.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true,
        children: {
          include: {
            user: true,
            likes: true,
            children: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return thread;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const likeThread = async ({
  userId,
  threadId,
  path,
}: {
  userId: string;
  threadId: string;
  path: string;
}) => {
  try {
    const exist = await db.like.findFirst({
      where: {
        userId,
        threadId,
      },
    });

    if (exist) {
      await db.like.delete({ where: { id: exist.id } });
      return revalidatePath(path);
    }

    await db.like.create({
      data: {
        userId,
        threadId,
      },
    });

    return revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteThread = async ({
  id,
  path,
}: {
  id: string;
  path: string;
}) => {
  try {
    await db.thread.delete({ where: { id } })

    return revalidatePath(path)
  } catch (error:any) {
    throw new Error(error.message)
  }
}