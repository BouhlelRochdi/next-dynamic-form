import { z, ZodSchema } from "zod";

type FieldConfig = {
  name: string;
  type: string;
  label: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  options?: { label: string; value: string }[]; // for select and radio options
  fields?: FieldConfig[];
};

export const generateSchema = (config: FieldConfig[]): ZodSchema => {
  const shape: Record<string, ZodSchema> = {};

  config.forEach((field) => {
    let schema: ZodSchema;

    if (field.type === "object" && field.fields) {
      schema = generateSchema(field.fields).refine(
        (val) => !!val,
        `${field.label} is required`
      );
    } else if (field.type === "email") {
      schema = z.string().email("Invalid email address");
    } else if (field.type === "number") {
      schema = z
        .number()
        .min(
          field.validation?.min ?? 0,
          `Minimum value is ${field.validation?.min ?? 0}`
        )
        .max(
          field.validation?.max ?? 100,
          `Maximum value is ${field.validation?.max ?? 100}`
        );
    } else {
      schema = z.string(); // Default for other types (e.g., text)
    }

    if (field.validation?.required) {
      if (field.type === "number") {
        schema = schema.refine((val) => val !== undefined && val !== null, {
          message: `${field.label} is required`,
        });
      } else {
        schema = (schema as z.ZodString).min(1, `${field.label} is required`);
      }
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
};
