import { z } from "zod";
import { BaseRequestSchema } from "../Base";

export const bookDetailsSchema = new BaseRequestSchema({
  jsonSchema: z.object({}),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({
    id: z.string().refine((id) => {
      return /^\d+$/.test(id);
    }, "Book ID must be a number"),
  }),
  querySchema: z.object({}),
});
