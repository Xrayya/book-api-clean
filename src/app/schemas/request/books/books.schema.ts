import { z } from "zod";
import { BaseRequestSchema } from "../Base";

export const getBooksSchema = new BaseRequestSchema({
  jsonSchema: z.object({}),
  cookieSchema: z.object({}),
  formSchema: z.object({}),
  headerSchema: z.object({}),
  paramSchema: z.object({}),
  querySchema: z.object({}),
  // querySchema: z.object({
  //   search: z.string().optional(),
  //   title: z.string().optional(),
  //   titleStartWith: z.string().optional(),
  //   titleEndWith: z.string().optional(),
  //   ISBN: z.string().optional(),
  //   publisher: z.string().optional(),
  //   category: z
  //     .string()
  //     .refine((category) => {
  //       const bookCategoryValues = Object.values(BookCategory);

  //       return bookCategoryValues.includes(category as BookCategory);
  //     }, "Invalid category code")
  //     .optional(),
  //   edition: z
  //     .string()
  //     .refine((edition) => {
  //       return /^\d+$/.test(edition);
  //     }, "Edition must be a number")
  //     .optional(),
  //   sortBy: z
  //     .string()
  //     .refine((sortBy) => {
  //       type BookProperty = keyof Book;
  //       const bookProperties: BookProperty[] = [
  //         "id",
  //         "title",
  //         "author",
  //         "ISBN",
  //         "publisher",
  //         "publishedDate",
  //         "category",
  //         "edition",
  //       ];

  //       return bookProperties.includes(sortBy as BookProperty);
  //     }, "Invalid sortBy property")
  //     .optional(),
  //   sortDirection: z
  //     .string()
  //     .refine((sortDirection) => {
  //       return sortDirection === "asc" || sortDirection === "desc";
  //     }, "Sort direction must be either 'asc' or 'desc")
  //     .optional(),
  //   available: z
  //     .string()
  //     .refine((available) => {
  //       return available === "true" || available === "false";
  //     }, "Available must be either 'true' or 'false'")
  //     .optional(),
  // }),
});
