import {z} from "zod";

const UserValidationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    userId: z.string().uuid()
});

export const AddNewUserValidation = UserValidationSchema.required().omit({userId: true});

