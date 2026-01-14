import { z } from 'zod';

export const acceptMesssageSchema = z.object({
    acceptMesssages: z.boolean().optional(),
})

