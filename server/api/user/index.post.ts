import prisma from "~/lib/prisma"
import { z } from "zod"

export default defineEventHandler(async (event) => {
  const objectSchema = z.object({
    name: z.string().min(1, { message: "请输入名称" }),
    email: z.string().email({ message: "请输入邮箱" })
  })
  const validator = await readValidatedBody(event, objectSchema.safeParse)
  if (validator.success) {
    const { email, name } = validator.data
    const result = await prisma.user.create({
      data: {
        email,
        name
      }
    })
    return result
  } else {
    throw createError({
      statusCode: 400,
      message: validator.error.message,
    })
  }
})