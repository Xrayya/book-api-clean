import { z } from "zod";
import { BaseRequestSchema } from "../Base";

export const returnSchema = new BaseRequestSchema({
  jsonSchema: z.object({
    bookId: z.number().int(),
  }),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({}),
  querySchema: z.object({}),
});
