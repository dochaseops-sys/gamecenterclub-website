import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const otpVerificationSchema = z.object({
  otp: z.string().length(4),
})

export type OTPVerificationValues = z.infer<typeof otpVerificationSchema>;

export const useOTPVerificationForm = () => {
  return useForm<OTPVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
};