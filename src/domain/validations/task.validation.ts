import {z} from "zod";

const TaskValidationSchema = z.object({
    taskId: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    deadline: z
        .string()
        .regex(
            new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"),
            "Invalid Date Format, must be YYYY-MM-DD"
        ),
    finishedAt: z
        .string()
        .regex(
            new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"),
            "Invalid Date Format, must be YYYY-MM-DD"
        )
});

export const AddNewTaskValidation = TaskValidationSchema.required({
    title: true,
    description: true,
    deadline: true
})
    .partial({
        finishedAt: true
    })
    .omit({userId: true, taskId: true});

export const EditTaskValidation = TaskValidationSchema.required({
    taskId: true
}).partial();

export const DeleteTaskValidation = TaskValidationSchema.required({taskId: true}).omit({
    title: true,
    description: true,
    deadline: true,
    finishedAt: true
});

