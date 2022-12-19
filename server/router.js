const express = require('express')
const router = express.Router()
const user = require('./api')

router.get('/weight', user.getData)
router.post('/addweight', user.postData)
router.post('/delete', user.deleteData)
router.post('/gettable', user.postPageData)
router.post('/update', user.updateData)

router.post('/login', user.getUser)

module.exports = router
