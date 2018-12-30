import { createApp } from './app'

// pass data for init of app
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context.testData)

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      context.state = store.state;
      resolve(app)
    }, reject)
  })
}