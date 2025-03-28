"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import MDEditor from "@uiw/react-md-editor";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { createArticle } from "@/actions/article.action";
import { Plus } from "lucide-react";

const CreateArticle = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const article = await createArticle(values);
      if (article?.success) {
        toast.success("Article created successfully");
      }
    } catch (error) {
      toast.error("Failed to create article");
      console.log(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
      setContent("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center cursor-pointer border bg-transparent text-white hover:bg-transparent">
          <span className="md:block hidden">Create article</span> <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-muted-foreground mb-5">
            Create Article
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const values = Object.fromEntries(formData.entries());

            await onSubmit({
              ...values,
              content,
            });
          }}
          method="post"
          className="flex flex-col gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-muted-foreground">
              Title
            </Label>
            <Input
              className="rounded-full p-5"
              name="title"
              placeholder="Enter Title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryArticle" className="text-muted-foreground">
              Category
            </Label>
            <Input
              className="rounded-full p-5"
              name="categoryArticle"
              placeholder="Enter a Category"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="readTime" className="text-muted-foreground">
              Read Time
            </Label>
            <Input
              className="rounded-full p-5"
              name="readTime"
              placeholder="Enter Read Time"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-muted-foreground">
              Image URL
            </Label>
            <Input
              className="rounded-full p-5"
              name="imageUrl"
              placeholder="Enter Image URL"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-muted-foreground">
              Content
            </Label>
            <MDEditor
              value={content}
              onChange={(content) => setContent(content as string)}
              id="content"
              preview="edit"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: "Background",
              }}
              textareaProps={{
                placeholder: "Enter content here",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer rounded-full text-muted-foreground md:p-6 p-4 bg-gradient-to-r from-blue-950 to-indigo-500"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateArticle;
