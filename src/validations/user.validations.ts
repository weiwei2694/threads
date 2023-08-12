import * as z from "zod";

export const userValidation = z.object({
  name: z.string().nonempty().min(3).max(30),
  username: z.string().toLowerCase().trim().nonempty().min(3).max(30),
  bio: z.string().max(199),
  image: z.string().nonempty(),
});
