import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number.isInteger(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID格式错误',
    })
  }
  const result = await prisma.user.delete({
    where: { id: Number(id) }
  })
  return result
})
