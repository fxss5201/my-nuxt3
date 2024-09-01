import prisma from "~/lib/prisma"

export default defineEventHandler(async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true}
  })
  return posts
})
