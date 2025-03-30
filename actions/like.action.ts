"use server";

import { prisma } from "@/lib/prisma";
import { getDBUserId } from "./user.action";

export const toggleLike = async (articleId: string) => {
  try {
    const userId = await getDBUserId();
    if (!articleId) return null;

    if (!userId) throw new Error("Unauthorized");

    // Cek apakah artikelnya sudah di like
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },

      select: {
        authorId: true,
      },
    });

    if (!article) throw new Error("Article not found");

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_articleId: {
            userId,
            articleId,
          },
        },
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          articleId,
        },
      });
    }
  } catch (error) {
    throw new Error("Failed to toggle like");
  }
};
