import * as z from 'zod'

export const threadValidation = z.object({
    text: z.string().nonempty().min(3).max(699)
})