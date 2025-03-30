"use server";

import { prisma } from "@/lib/prisma";
import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export const createComment = async (articleId: string, content: string) => {
  try {
    const authorId = await getDBUserId();

    if (!authorId) throw new Error("Unauthorized");

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        articleId,
      },
    });

    revalidatePath(`/article/${articleId}`);
    return { success: true, data: comment };
  } catch (error) {
    return { success: false, error };
  }
};

export const getAllComments = async (articleId: string) => {
  try {
    if (!articleId) return null;

    const comments = await prisma.comment.findMany({
      where: {
        articleId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};
