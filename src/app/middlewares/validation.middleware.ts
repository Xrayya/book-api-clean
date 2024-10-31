import { createFactory } from "hono/factory";
import type { ZodRawShape } from "zod";
import { validator } from "hono/validator";
import type { BaseRequestSchema } from "../schema/request/Base";

const handlersFactory = createFactory();

export const validateRequest = <
  TJson extends ZodRawShape = {},
  TQuery extends ZodRawShape = {},
  THeader extends ZodRawShape = {},
  TParams extends ZodRawShape = {},
  TCookie extends ZodRawShape = {},
  TForm extends ZodRawShape = {}
>(
  schema: BaseRequestSchema<TJson, TQuery, THeader, TParams, TCookie, TForm>
) => {
  return handlersFactory.createHandlers(
    validator("header", (value, c) => {
      // if (!schema.header) return value;

      const result = schema.header?.safeParse(value);
      if (!result?.success) {
        return c.json(
          {
            message: "Invalid request header",
            traces: result?.error.errors.map(({ path, message }) => {
              return {
                property: path.join("."),
                message,
              };
            }),
          },
          400
        );
      }

      return result?.data;
    }),
    validator("param", (value, c) => {
      // if (!schema.param) return value;

      const result = schema.param?.safeParse(value);
      if (!result?.success) {
        return c.json(
          {
            message: "Invalid request url parameter",
            traces: result?.error.errors.map(({ path, message }) => {
              return {
                property: path.join("."),
                message,
              };
            }),
          },
          400
        );
      }

      return result?.data;
    }),
    validator("query", (value, c) => {
      // if (!schema.query) return value;

      const result = schema.query?.safeParse(value);
      if (!result?.success) {
        return c.json(
          {
            message: "Invalid request query params",
            traces: result?.error.errors.map(({ path, message }) => {
              return {
                property: path.join("."),
                message,
              };
            }),
          },
          400
        );
      }

      return result?.data;
    }),
    validator("cookie", (value, c) => {
      // if (!schema.cookie) return value;

      const result = schema.cookie?.safeParse(value);
      if (!result?.success) {
        return c.json(
          {
            message: "Invalid request cookie",
            traces: result?.error.errors.map(({ path, message }) => {
              return {
                property: path.join("."),
                message,
              };
            }),
          },
          400
        );
      }

      return result?.data;
    })
  );
};

export const validateJsonRequest = <
  TJson extends ZodRawShape = {},
  TQuery extends ZodRawShape = {},
  THeader extends ZodRawShape = {},
  TParams extends ZodRawShape = {},
  TCookie extends ZodRawShape = {},
  TForm extends ZodRawShape = {}
>(
  schema: BaseRequestSchema<TJson, TQuery, THeader, TParams, TCookie, TForm>
) => {
  const base = validateRequest(schema);

  return handlersFactory.createHandlers(
    ...base,
    validator("json", (value, c) => {

      const result = schema.json?.safeParse(value);
      if (!result?.success) {
        return c.json(
          {
            message: "Invalid request body",
            traces: result?.error.errors.map(({ path, message }) => {
              return {
                property: path.join("."),
                message,
              };
            }),
          },
          400
        );
      }

      return result?.data;
    })
  );
};

export const validateFormRequest = <
  TJson extends ZodRawShape = {},
  TQuery extends ZodRawShape = {},
  THeader extends ZodRawShape = {},
  TParams extends ZodRawShape = {},
  TCookie extends ZodRawShape = {},
  TForm extends ZodRawShape = {}
>(
  schema: BaseRequestSchema<TJson, TQuery, THeader, TParams, TCookie, TForm>
) => {
  const base = validateRequest(schema);

  return handlersFactory.createHandlers(
    ...base,
    validator("form", (value, c) => {
      // if (!schema.form) return value;

      const result = schema.form?.safeParse(value);
      if (!result?.success) {
        return c.json(
          {
            message: "Invalid request form data",
            traces: result?.error.errors.map(({ path, message }) => {
              return {
                property: path.join("."),
                message,
              };
            }),
          },
          400
        );
      }

      return result?.data;
    })
  );
};
