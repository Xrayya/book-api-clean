import { z } from "zod";
import { BaseRequestSchema } from "../Base";

export const suspensionSchema = new BaseRequestSchema({
  jsonSchema: z.object({
    userId: z.number().int(),
  }),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({}),
  querySchema: z.object({}),
});
