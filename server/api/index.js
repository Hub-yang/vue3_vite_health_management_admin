const db = require('../db')
// 引入jsonwebtoken
const jwt = require('jsonwebtoken')

// 登录
exports.getUser = (req, res) => {
  const $uname = req.body.username
  const $upwd = req.body.password
  const sql = 'select*from users where username=? and password=?'
  // 连接数据库
  db.query(sql, [$uname, $upwd], (err, result) => {
    if (err) return res.send('error' + err.message)
    if (result.length > 0) {
      // 生成token
      const token = jwt.sign(req.body, 'shhhhh')
      const data = {
        ...result[0],
        token,
      }
      res.send({
        code: 200,
        data,
      })
    } else {
      res.send({
        code: 201,
        msg: '用户名或密码错误',
      })
    }
  })
}

// 获取热量体重图表数据
exports.getData = (req, res) => {
  // 响应头
  // res.setHeader("Access-Control-Allow-Origin", "*")
  const sql = 'select * from my_weight'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send(data)
  })
}

// 新增数据
exports.postData = (req, res) => {
  const obj = req.body
  if (!obj) {
    res.send({
      code: 201,
      msg: '参数为空',
    })
    return
  }
  const sql = 'SELECT * FROM my_weight WHERE date = ?'
  db.query(sql, [obj.date], (err, result) => {
    if (err) {
      return res.send('error' + err.message)
    }
    if (result.length !== 0) {
      console.log('值存在')
      // 值存在
      res.send({
        code: 201,
        msg: '该时间数据已存在',
      })
    } else {
      // 新增
      const sql1 = 'INSERT INTO my_weight SET ?'
      const newObj = {
        ...obj,
        training: JSON.stringify(obj.training),
      }
      db.query(sql1, [newObj], (err, result) => {
        if (err) {
          return res.send('error' + err.message)
        }
        console.log('值新增')
        if (result.affectedRows > 0) {
          res.send({
            code: 200,
            msg: '添加成功',
          })
        } else {
          res.send({
            code: 301,
            msg: '添加失败',
          })
        }
      })
    }
  })
}

// 更新数据
exports.updateData = (req, res) => {
  const obj = req.body
  if (!obj) {
    res.send({
      code: 201,
      msg: '参数为空',
    })
    return
  }
  const sql = 'UPDATE my_weight SET weight = ?,caloric = ?,sporttime = ? WHERE date = ?'
  const newObj = {
    ...obj,
    training: JSON.stringify(obj.training),
  }
  db.query(sql, [newObj.weight, newObj.caloric, newObj.trainingTime, newObj.date], (err, result) => {
    if (err) {
      return res.send('error' + err.message)
    }
    console.log('值更新')
    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        msg: '更新成功',
      })
    } else {
      res.send({
        code: 301,
        msg: '更新失败',
      })
    }
  })
}

// 删除数据
exports.deleteData = (req, res) => {
  const obj = req.body
  if (!obj.date) {
    res.send({
      code: 201,
      msg: '参数为空',
    })
    return
  }
  const sql = 'DELETE FROM my_weight WHERE date = ?'
  db.query(sql, [obj.date], (err, result) => {
    if (err) {
      return res.send('error' + err.message)
    }
    if (result.affectedRows > 0) {
      console.log('值删除')
      res.send({
        code: 200,
        msg: '删除成功',
      })
    } else {
      res.send({
        code: 301,
        msg: '删除失败',
      })
    }
  })
}

// 分页
exports.postPageData = (req, res) => {
  // 获取参数
  const param = req.body

  if (param.page === '' || param.page == null || param.page === undefined) {
    res.send(JSON.stringify({ msg: '请传入参数page', code: 102 }))
    return
  }
  const pageSize = param.pageSize || 20
  const start = (param.page - 1) * pageSize

  const sql = `SELECT * FROM my_weight ORDER BY date DESC limit ${pageSize} OFFSET ${start}`
  db.query(sql, function (err, result) {
    if (err) {
      return res.send('error' + err.message)
    } else {
      // // 计算总页数
      // var allCount = allDataCount;
      // console.log(allCount, start)
      // var allPage = parseInt(allCount) / 20;
      // var pageStr = allPage.toString();
      // // 不能被整除
      // if (pageStr.indexOf('.') > 0) {
      //   allPage = parseInt(pageStr.split('.')[0]) + 1;
      // }
      const list = result
      // res.send(JSON.stringify({ msg: '操作成功', code: 200, tableInfo: { totalPages: allPage, currentPage: param.page, totalCount: allCount, data: list } }));
      res.send(
        JSON.stringify({
          msg: '操作成功',
          code: 200,
          tableInfo: { currentPage: param.page, data: list },
        }),
      )
    }
  })
}
