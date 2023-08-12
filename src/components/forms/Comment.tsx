"use client";
import { usePathname } from "next/navigation";

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
import { Input } from "../ui/input";

import { createThread } from "@/actions/thread.actions";
import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  author: User;
  parentId: string;
}

const Comment = ({ author, parentId }: Props) => {
  const path = usePathname();

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThread({
      userId: author.id,
      text: values.text,
      parentId,
      path,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-start justify-between gap-10"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 flex-1">
              <div className="flex flex-row items-center gap-5">
                <FormLabel className="relative w-11 h-11">
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={44}
                    height={44}
                    className="object-contain rounded-full"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus comment-input"
                    placeholder="Comment..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-button">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
