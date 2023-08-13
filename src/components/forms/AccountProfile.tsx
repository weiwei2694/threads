"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/validations/user.validations";

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
import { User } from "@prisma/client";
import { updateUser } from "@/actions/user.actions";
import { Input } from "../ui/input";
import Image from "next/image";
import { ChangeEvent } from "react";
import { AiFillCamera } from "react-icons/ai";

interface Props {
  user: User;
}

const AccountProfile = ({ user }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [mutation, setMutation] = useState(false)

  const path = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      image: user.image,
      bio: user.bio ?? "",
    },
  });

  const imageOnChange = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e?.target?.files?.length) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataURl = event?.target?.result?.toString() || "";

        fieldChange(imageDataURl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof userValidation>) => {

    setMutation(true)

    try {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_SECRET_KEY ?? "");
  
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        
        if (res.status !== 200) return null;
  
        const { secure_url } = await res.json()
  
        values.image = secure_url
      }
  
      await updateUser({
        id: user.id,
        name: values.name,
        username: values.username,
        bio: values.bio,
        image: values.image,
        path,
        email: user.email,
      });
  
      router.push(`/profile/${user.id}`); 
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setMutation(false)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-fit">
              <FormLabel
                htmlFor="image"
                className="cursor-pointer relative flex justify-center"
              >
                <Image
                  src={field.value}
                  alt="profile photo"
                  width={120}
                  height={120}
                  priority
                  className="rounded-full object-cover w-[120px] h-[120px]"
                />

                <div className="absolute bottom-0 right-0">
                  {/* Icons */}
                  <p className="text-dark-1 bg-light-1 hover:bg-light-2 rounded-full p-1 transition-all text-2xl">
                    <AiFillCamera />
                  </p>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="hidden"
                  onChange={(e) => imageOnChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="heading-2">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="no-focus account-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="heading-2">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="no-focus account-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="heading-2">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus account-form_input"
                  rows={14}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Changes Button */}
        <Button type="submit" disabled={mutation} className="bg-primary-500 w-full">
          {mutation ? 'Save Changes...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
