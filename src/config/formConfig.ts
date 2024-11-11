import { z } from "zod";

export const formConfig = [
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: z.string().email("Invalid email address"),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    validation: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    customValidation: (data: any) => data.password === data.confirmPassword,
  },
];
