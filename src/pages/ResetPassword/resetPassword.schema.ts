import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
  confirmPassword: z.string(),
  token: z.string().min(1, "Token is required"),
  user_id: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'],
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordForm = (initialValues?: Partial<ResetPasswordValues>) => {
  return useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
      user_id: "",
      ...initialValues,
    },
    shouldFocusError: true,
  });
};