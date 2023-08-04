import {z} from "zod";
const AuthValidationSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const LoginValidtion = AuthValidationSchema.required();

