const router = require('koa-router')();
const common = require('../libs/common');
const jwt = require('jsonwebtoken');
const addtoken = require('../token/addtoken');
const table = "user"
router.post('/', async ctx => {
  /* 获取帐号密码*/
  let {
    username,
    password
  } = ctx.request.fields;

  /* 检查帐号密码*/

  /* 查询帐号信息*/
  let datas = await ctx.db.query(`SELECT * FROM ${table} where username = ?`, [username]);

  /* 判断帐号*/
  let msg = {};
  let data = {};
  if (!datas) {
      msg="用户名不存在"
  } else if (datas[0].password != common.md5(ctx.config.ADMIN_PREFIX + password)) {
      msg="密码错误"
  } else {
    let token = addtoken({username:datas[0].username,id:datas[0].id})  //token中要携带的信息，自己定义
    data={
      username,
      token
    }
  }
  /* 返回页面参数*/
    ctx.body = {
      code: 0,
      status: 200,
      msg,
      data
    };
});


module.exports = router.routes();