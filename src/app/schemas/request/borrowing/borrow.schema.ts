import { z } from "zod";
import { BaseRequestSchema } from "../Base";

export const borrowSchema = new BaseRequestSchema({
  jsonSchema: z.object({
    bookIds: z.array(z.number().int()),
  }),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({}),
  querySchema: z.object({}),
});
