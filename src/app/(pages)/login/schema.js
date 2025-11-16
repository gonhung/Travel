import { email, z } from "zod"

const schema = z.object({
    username: z.string(),
    email: z.string().min(1, { message : "Email is required"}).email("Invalid email address"),
    password: z.string().min(6, {message: "Password must be at least 6 charactes long"})
})

export {
    schema
}