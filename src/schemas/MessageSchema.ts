import { z } from 'zod';

export const messsageSchema = z.object({
    content: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(500, 'Message cannot exceed 500 characters')
})

