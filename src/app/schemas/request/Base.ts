import type { ZodRawShape, ZodObject, ZodTypeAny, z } from "zod";

export class BaseRequestSchema<
  TJson extends ZodRawShape = ZodRawShape,
  TQuery extends ZodRawShape = ZodRawShape,
  THeader extends ZodRawShape = ZodRawShape,
  TParams extends ZodRawShape = ZodRawShape,
  TCookie extends ZodRawShape = ZodRawShape,
  TForm extends ZodRawShape = ZodRawShape,
> {
  json: ZodObject<
    TJson,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TJson>>,
    z.infer<ZodObject<TJson>>
  >;
  query: ZodObject<
    TQuery,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TQuery>>,
    z.infer<ZodObject<TQuery>>
  >;
  header: ZodObject<
    THeader,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<THeader>>,
    z.infer<ZodObject<THeader>>
  >;
  param: ZodObject<
    TParams,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TParams>>,
    z.infer<ZodObject<TParams>>
  >;
  cookie: ZodObject<
    TCookie,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TCookie>>,
    z.infer<ZodObject<TCookie>>
  >;
  form: ZodObject<
    TForm,
    "strip",
    ZodTypeAny,
    z.infer<ZodObject<TForm>>,
    z.infer<ZodObject<TForm>>
  >;

  constructor({
    jsonSchema,
    querySchema,
    headerSchema,
    paramSchema,
    cookieSchema,
    formSchema,
  }: {
    jsonSchema: ZodObject<TJson, "strip">;
    querySchema: ZodObject<TQuery, "strip">;
    headerSchema: ZodObject<THeader, "strip">;
    paramSchema: ZodObject<TParams, "strip">;
    cookieSchema: ZodObject<TCookie, "strip">;
    formSchema: ZodObject<TForm, "strip">;
  }) {
    this.json = jsonSchema;
    this.query = querySchema;
    this.header = headerSchema;
    this.param = paramSchema;
    this.cookie = cookieSchema;
    this.form = formSchema;
  }
}

// export type TypedRequest<T extends ExpressRequestSchema> = Request<
//   z.infer<T["params"]>,
//   any,
//   z.infer<T["body"]>,
//   z.infer<T["queryParams"]>
// >;
