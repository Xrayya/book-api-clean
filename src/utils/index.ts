import BookCategory from "../enums/BookCategory.enum";

const codeToBookCategory: { [key: string]: BookCategory } = {
  "000": BookCategory.GENERAL_WORK,
  "100": BookCategory.PHILOSOPHY_AND_PSYCHOLOGY,
  "200": BookCategory.RELIGION,
  "300": BookCategory.SOCIAL_SCIENCES,
  "400": BookCategory.LANGUAGE,
  "500": BookCategory.NATUAL_SCIENCES_AND_MATHEMATICS,
  "600": BookCategory.TECHNOLOGY_AND_APPLIED_SCIENCES,
  "700": BookCategory.ARTS_AND_RECREATION,
  "800": BookCategory.LITERATURE,
  "900": BookCategory.HISTORY_AND_GEOGRAPHY,
};

export function bookCategoryCodeMapper(code: string): BookCategory {
  return codeToBookCategory[code] || BookCategory.GENERAL_WORK;
}
