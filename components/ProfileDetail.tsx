"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { getCurrentUser, updateProfile } from "@/actions/user.action";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

type UserDetail = Awaited<ReturnType<typeof getCurrentUser>>;

const ProfileDetail = ({
  user,
  isAdmin,
}: {
  user: UserDetail;
  isAdmin: boolean;
}) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [role, setRole] = useState(user?.role || "USER");
  const [username, setUsername] = useState(user?.username || "");
  const [image, setImage] = useState(user?.image || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData.entries());

      const user = await updateProfile({ ...values, role });

      if (user.success) {
        toast.success("Profile updated");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-center md:text-3xl text-xl text-gray-500 font-semibold">
          {user?.role} PROFILE
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground my-2">
          Setting for your personal profile
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {/* PROFILE PICTURE & USERNAME */}
          <h3 className="text-gray-500 my-2">Profile picture</h3>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.image ?? "/avatar.png"} />
            </Avatar>
            <div className="flex flex-col">
              <p className="text-gray-500">{user?.username}</p>
              <p className="text-xs text-muted-foreground">
                Role: {user?.role}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <form onSubmit={handleSubmit} method="put">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-gray-500">
                Username
              </Label>
              <Input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-muted-foreground"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-500">
                Email Address
              </Label>
              <Input name="email" defaultValue={user?.email} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="userImageUrl" className="text-gray-500">
                Image URL
              </Label>
              <Input
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="text-muted-foreground"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="text-gray-500">
                Role
              </Label>
              <Select
                disabled={!isAdmin}
                onValueChange={(value: any) => setRole(value)}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue
                    className="text-muted-foreground"
                    placeholder={user?.role}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="text-muted-foreground" value="ADMIN">
                    ADMIN
                  </SelectItem>
                  <SelectItem className="text-muted-foreground" value="USER">
                    USER
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end items-end ">
            <Button
              disabled={
                isSubmiting ||
                (user?.username.trim() === username.trim() &&
                  user?.role === role &&
                  user?.image?.trim() === image.trim())
              }
              type="submit"
              className="disabled:cursor-not-allowed disabled:text-muted-foreground mt-4 bg-transparent hover:bg-transparent border text-foreground cursor-pointer"
            >
              {isSubmiting ? (
                <Loader2Icon className="animate-spin text-foreground" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetail;
