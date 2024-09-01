import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch((() => {}))
  const { title, content, authorEmail } = body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: {
        connect: {
          email: authorEmail
        }
      }
    }
  })
  return result
})