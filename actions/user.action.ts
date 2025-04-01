"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const syncUser = async () => {
  try {
    const { userId: clerkId } = await auth();
    const user = await currentUser();

    if (!clerkId || !user) return null;

    const existingUser = await prisma.user.findFirst({
      where: {
        clerkId,
      },
    });

    if (existingUser) return existingUser;

    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email: user?.emailAddresses[0].emailAddress,
        username:
          user?.username ?? user?.emailAddresses[0].emailAddress.split("@")[0],
        image: user?.imageUrl,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sync user");
  }
};

export const getDBUserId = async () => {
  try {
    const { userId } = await auth();

    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return user?.id;
  } catch (error) {
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserRoleAdmin = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return null;

    const adminRole = await prisma.user.findUnique({
      where: {
        clerkId: userId,
        role: "ADMIN",
      },
    });
    return adminRole;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (data: any) => {
  try {
    const userId = await getDBUserId();

    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: data.username,
        role: data.role,
        image: data.image,
      },
    });

    revalidatePath("/profile");
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error };
  }
};
