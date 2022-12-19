const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router')
const app = express()

// 配置跨域，必须在路由之前
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

app.listen(3015, () => {
  console.log('服务器启动成功')
})
