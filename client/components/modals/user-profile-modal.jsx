import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useModal } from "../../hooks/useModal";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrentUser, useEditProfile } from "../../hooks/useAuth";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1)
    .optional(),
  email: z
    .string({
      required_error: "Email name is required",
    })
    .email({
      message: "Invalid Email Address",
    })
    .optional(),
  password: z.string().min(6).optional(),
});

export const UserProfileModal = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useCurrentUser();
  const editProfile = useEditProfile();
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "userProfile";

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (vals) => {
    try {
      editProfile.mutate({
        userId: user._id,
        data: vals,
      });
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.reset(user);
  }, [user, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Profile Settings
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Update your profile details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3 px-6">
              <FormField
                control={form.control}
                name="name"
                disabled={isLoading || !isEdit}
                defaultValues={data.title}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                disabled={isLoading || !isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                disabled={isLoading || !isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your password"
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>
                      {isEdit
                        ? "Enter new password to update it."
                        : "Password is not available due to security reasons."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4 bg-gray-100">
              {isEdit && (
                <Button disabled={isLoading} className="flex items-center">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}{" "}
                  Update
                </Button>
              )}
              {!isEdit && <Button onClick={() => setIsEdit(true)}>Edit</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
