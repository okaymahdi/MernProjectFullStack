const app = require('./app')
const connectDatabse = require('./config/db')
const { serverPort } = require('./secret')

/** Create Express Server */
app.listen(serverPort, async () => {
  console.log(`Example app listening on port http://localhost:${serverPort}`)
  await connectDatabse()
})
