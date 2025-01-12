import { z } from "zod";
import { BaseRequestSchema } from "../Base";
import BookCategory from "@domain/enums/BookCategory.enum";

export const getBooksSchema = new BaseRequestSchema({
  jsonSchema: z.object({}),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({}),
  querySchema: z.object({
    search: z.string().optional(),
    available: z
      .string()
      .refine((available) => {
        return available === "true" || available === "false";
      }, "Available must be either 'true' or 'false")
      .optional(),
    category: z
      .string()
      .refine((category) => {
        const bookCategoryValues = Object.values(BookCategory);

        return bookCategoryValues.includes(category as BookCategory);
      }, "Invalid category code")
      .optional(),
    publishedYearStart: z
      .string()
      .refine((publishedYearStart) => {
        return /^\d{4}$/.test(publishedYearStart);
      })
      .optional(),
    publishedYearEnd: z
      .string()
      .refine((publishedYearEnd) => {
        return /^\d{4}$/.test(publishedYearEnd);
      })
      .optional(),
  }),
});
