"use client";

import { deleteArticle, updateArticle } from "@/actions/article.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import dayjs from "dayjs";
import { Edit, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const DashboardArticle = ({ articles }: { articles: any }) => {
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>("");

  const handleEditClick = (article: any) => {
    setSelectedArticle(article);
    setContent(article.content || "");
    setOpen(true);
  };

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const data = await updateArticle(selectedArticle.id, values);
      if (data.success) {
        toast.success("Article updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update article");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const deleteArticleById = async (id: string) => {
    try {
      const data = await deleteArticle(id);
      if (data.success) {
        toast.success("Article deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  return (
    <div className="mt-10">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Read Time</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article: any) => (
            <TableRow key={article.id}>
              <TableCell className="max-w-[200px]">
                {article.title.slice(0, 30) + "..."}
              </TableCell>
              <TableCell>{article.categoryArticle}</TableCell>
              <TableCell>{article.readTime} Min</TableCell>
              <TableCell>
                {article.views} {article.views > 1 ? "views" : "view"}
              </TableCell>
              <TableCell>
                {dayjs(article.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell>
                {dayjs(article.updatedAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell className="flex gap-3 items-center">
                <Edit
                  className="size-4 text-muted-foreground cursor-pointer"
                  onClick={() => handleEditClick(article)}
                />
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent
                    className="max-h-[90vh] overflow-y-scroll"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-center text-muted-foreground mb-5">
                        Update Article
                      </DialogTitle>
                    </DialogHeader>
                    {selectedArticle && (
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
                        method="put"
                        className="flex flex-col gap-4"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="title"
                            className="text-muted-foreground"
                          >
                            Title
                          </Label>
                          <Input
                            className="rounded-full p-5"
                            name="title"
                            defaultValue={selectedArticle.title}
                            placeholder="Enter Title"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="categoryArticle"
                            className="text-muted-foreground"
                          >
                            Category
                          </Label>
                          <Input
                            className="rounded-full p-5"
                            name="categoryArticle"
                            defaultValue={selectedArticle.categoryArticle}
                            placeholder="Enter a Category"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="readTime"
                            className="text-muted-foreground"
                          >
                            Read Time
                          </Label>
                          <Input
                            className="rounded-full p-5"
                            name="readTime"
                            defaultValue={selectedArticle.readTime}
                            placeholder="Enter Read Time"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="imageUrl"
                            className="text-muted-foreground"
                          >
                            Image URL
                          </Label>
                          <Input
                            className="rounded-full p-5"
                            name="imageUrl"
                            defaultValue={selectedArticle.imageUrl}
                            placeholder="Enter Image URL"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="content"
                            className="text-muted-foreground"
                          >
                            Content
                          </Label>
                          <MDEditor
                            value={content}
                            onChange={(content) => setContent(content || "")}
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
                          {isLoading ? "Updating..." : "Update"}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Modal Hapus */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2Icon className="size-4 text-red-500 cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your article.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteArticleById(article.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardArticle;
