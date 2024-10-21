import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
  }
}>

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  
  const body =  await c.req.json()

  const user = await prisma.user.create({
    // @ts-ignore
    data: {
      email: body.email,
      password: body.password,
    },
  })

  const token = await sign({id: user.id}, 'secret')
  return c.json({ json: token })
})


app.post('/api/v1/signin', (c) => {
  return c.json({ message: 'Signup route' })
})
app.post('/api/v1/blog', (c) => {
  return c.json({ message: 'Signup route' })
})
app.put('/api/v1/signup', (c) => {
  return c.json({ message: 'Signup route' })
})
app.get('/api/v1/blog:id', (c) => {
  return c.json({ message: 'Signup route' })
})

export default app
