import { expect, test, describe } from "bun:test";
import BookCategory from "./BookCategory.enum";

describe("BookCategory Enum", () => {
  test("Should have 4 categories", () => {
    expect(Object.keys(BookCategory).length).toBe(10);
  });

  test("Should have all 10 major categories with appropriate code", () => {
    expect(BookCategory.GENERAL_WORK.valueOf()).toBe("000");
    expect(BookCategory.PHILOSOPHY_AND_PSYCHOLOGY.valueOf()).toBe("100");
    expect(BookCategory.RELIGION.valueOf()).toBe("200");
    expect(BookCategory.SOCIAL_SCIENCES.valueOf()).toBe("300");
    expect(BookCategory.LANGUAGE.valueOf()).toBe("400");
    expect(BookCategory.NATUAL_SCIENCES_AND_MATHEMATICS.valueOf()).toBe("500");
    expect(BookCategory.TECHNOLOGY_AND_APPLIED_SCIENCES.valueOf()).toBe("600");
    expect(BookCategory.ARTS_AND_RECREATION.valueOf()).toBe("700");
    expect(BookCategory.LITERATURE.valueOf()).toBe("800");
    expect(BookCategory.HISTORY_AND_GEOGRAPHY.valueOf()).toBe("900");
  });
});
