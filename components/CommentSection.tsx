"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Loader2Icon, Send } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { createComment, getAllComments } from "@/actions/commen.action";
import { Separator } from "./ui/separator";
import { formatDistanceToNow } from "date-fns";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";

const formSchema = z.object({
  comment: z.string().min(2, "Comment must be at least 2 characters"),
});

type AllComments = Awaited<ReturnType<typeof getAllComments>>;

const CommentSection = ({
  article,
  comments,
  currentUser,
}: {
  article: any;
  comments: AllComments;
  currentUser: any;
}) => {
  const { user } = useUser();
  const { userId } = useAuth();

  const [isCommenting, setIsCommenting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCommenting(true);
    try {
      const data = await createComment(article.id, values.comment);

      if (data.success) {
        toast.success("Commented successfully");
      }
    } catch (error) {
      toast.error("Failed to comment");
    } finally {
      setIsCommenting(false);
      form.reset();
    }
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-500 md:text-2xl text-xl">Comments</h3>
          <span className="text-xs text-background bg-muted-foreground px-4 py-[1px] rounded-full">
            {article?._count.comments}
          </span>
        </div>
        {userId ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-4 mt-5"
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex space-x-4">
                        <Avatar className="size-8 flex-shrink-0">
                          <AvatarImage
                            src={currentUser?.image ?? "/avatar.png"}
                          />
                        </Avatar>
                        <Textarea
                          {...field}
                          className="flex-1"
                          placeholder="Write a comment..."
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="ml-[45px]" />
                  </FormItem>
                )}
              />
              <Button
                disabled={isCommenting}
                type="submit"
                className="cursor-pointer rounded-full text-background ml-[45px]"
              >
                {isCommenting ? (
                  <>
                    Sending
                    <Loader2Icon className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send
                    <Send />
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Button
            asChild
            className="cursor-pointer bg-transparent text-foreground hover:bg-transparent hover:text-foreground/80 w-max border mx-auto mt-5"
          >
            <SignInButton mode="modal">Login to comment</SignInButton>
          </Button>
        )}

        <Separator className="mt-10" />

        <div className="mt-10 flex flex-col gap-6">
          {comments?.map((comment: any) => (
            <div key={comment?.id} className="relative">
              <div className="flex gap-3">
                <Avatar className="size-8 flex-shrink-0">
                  <AvatarImage src={comment?.author?.image ?? "/avatar.png"} />
                </Avatar>
                <div className="absolute w-[1px] top-[35px] -bottom-[20px] left-[15px] bg-gray-400"></div>
                <div className="flex flex-col">
                  <p className="flex items-center gap-2 text-gray-500">
                    {comment?.author?.username} •
                    <span className="text-xs">
                      {formatDistanceToNow(new Date(comment?.createdAt))} ago
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {comment?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
