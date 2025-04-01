"use client";

import { toggleLike } from "@/actions/like.action";
import { SignInButton } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

const LikeArticle = ({
  article,
  userId,
}: {
  article: any;
  userId?: string | null;
}) => {
  const [hasLiked, setHasLiked] = useState(
    article?.likes.some((like: any) => like.userId === userId)
  );

  const [isLiking, setIsLiking] = useState(false);

  const [optimisticLike, setOptimisticLike] = useState(article?._count.likes);

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      setHasLiked((prev: boolean) => !prev);
      setOptimisticLike((prev: number) => prev + (hasLiked ? -1 : 1));
      await toggleLike(article.id);
    } catch (error) {
      setOptimisticLike(article?._count.likes);
      setHasLiked(article?.likes.some((like: any) => like.userId === userId));
      console.log("Failed to like", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2">
        {!userId ? (
          <SignInButton mode="modal">
            <ThumbsUp className="size-5 cursor-pointer text-muted-foreground" />
          </SignInButton>
        ) : (
          <ThumbsUp
            onClick={handleLike}
            className={`size-5 ${
              hasLiked ? "text-indigo-500" : "text-muted-foreground"
            } cursor-pointer`}
          />
        )}
        <div className="flex items-center gap-1 text-muted-foreground">
          <p>{optimisticLike}</p>
          <span>{optimisticLike > 1 ? "Likes" : "Like"}</span>
        </div>
      </div>
    </div>
  );
};

export default LikeArticle;
