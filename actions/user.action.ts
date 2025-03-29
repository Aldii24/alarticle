"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

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

    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return user?.id;
  } catch (error) {
    throw new Error("Failed to get user id");
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
