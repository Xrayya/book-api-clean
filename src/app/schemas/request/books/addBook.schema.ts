import { BookCategory } from "@domain/enums";
import { z } from "zod";
import { BaseRequestSchema } from "../Base";

export const addBookSchema = new BaseRequestSchema({
  jsonSchema: z.object({
    title: z.string(),
    author: z.string(),
    ISBN: z.string(),
    publisher: z.string(),
    publishedYear: z.number().int(),
    category: z.string().refine((category) => {
      const bookCategoryValues = Object.values(BookCategory);

      return bookCategoryValues.includes(category as BookCategory);
    }, "Invalid category code"),
    edition: z.number().int(),
  }),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({}),
  querySchema: z.object({}),
});
