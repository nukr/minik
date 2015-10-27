import Minik from '../'

const app = new Minik()

app.use(async (ctx, next) => {
  console.log('1')
  ctx.body = '123123123'
  console.log(ctx)
  await next()
  console.log('2')
})

app.use(async (ctx, next) => {
  console.log('3')
  console.log(ctx)
  await next()
  console.log('4')
})

async () => {
  let result = await app.callback()({aa: 11}, {bb: 22}, {cc: 33})
  console.log(result)
}()
