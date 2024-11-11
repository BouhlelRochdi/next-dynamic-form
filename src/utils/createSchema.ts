import { z } from "zod";
import { formConfig } from "../config/formConfig";

export const createSchema = () => {
  const schema = formConfig.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {} as Record<string, any>);

  return z
    .object(schema)
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
};
