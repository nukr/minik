import Emitter from 'events'
import compose from 'koa-compose'

export default class Application extends Emitter {
  constructor () {
    super()

    this.env = process.env.NODE_ENV || 'development'
    this.middleware = []
  }

  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

  callback () {
    let fn = compose(this.middleware)
    let that = this
    return (...args) => {
      let ctx = that.createContext.apply(that, args)
      return new Promise((resolve, reject) => {
        fn(ctx).then(() => {
          resolve(ctx.body)
        }).catch(reject)
      })
    }
  }

  createContext (root, args, info) {
    let context = {}
    context.root = root
    context.args = args
    context.info = info
    context.rootValue = info.rootValue
    context.fieldName = info.fieldName
    return context
  }
}
