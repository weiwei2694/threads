"use client";
import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadValidation } from "@/validations/thread.validations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { createThread } from "@/actions/thread.actions";

interface Props {
  userId: string;
  parentId?: string | null;
}

const PostThread = ({ userId, parentId = null }: Props) => {
  const path = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThread({
      userId,
      text: values.text,
      parentId,
      path,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="heading-2">Content</FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus bg-dark-2 outline-none border-none text-light-2"
                  rows={14}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 w-full">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
