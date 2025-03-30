"use server";

import { prisma } from "@/lib/prisma";
import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export const createArticle = async (data: any) => {
  try {
    const userId = await getDBUserId();

    if (!userId) return null;

    const article = await prisma.article.create({
      data: {
        title: data.title,
        categoryArticle: data.categoryArticle,
        readTime: data.readTime,
        content: data.content,
        imageUrl: data.imageUrl,
        authorId: userId,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: article };
  } catch (error) {
    return { success: false, error };
  }
};

export const getArticle = async (id: string) => {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },

      include: {
        author: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return article;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getArticles = async () => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return articles;
  } catch (error) {
    console.log(error);
  }
};

export const getOneLatestArticle = async () => {
  try {
    const article = await prisma.article.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return article;
  } catch (error) {
    console.log(error);
  }
};

export const getThreeLatestArticles = async () => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      include: {
        author: true,
      },
    });

    return articles;
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const userId = await getDBUserId();

    if (!userId) throw new Error("Unauthorized");

    await prisma.article.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const updateArticle = async (id: string, data: any) => {
  try {
    const userId = await getDBUserId();

    if (!userId) throw new Error("Unauthorized");

    const article = await prisma.article.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        categoryArticle: data.categoryArticle,
        readTime: data.readTime,
        content: data.content,
        imageUrl: data.imageUrl,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: article };
  } catch (error) {
    return { success: false, error };
  }
};

export const getArticleBySearh = async (search: string) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        author: true,
      },
    });

    return articles;
  } catch (error) {
    console.log(error);
  }
};
