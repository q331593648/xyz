const router = require('koa-router')();
const common = require('../libs/common');
const jwt = require('jsonwebtoken');
const addtoken = require('../token/addtoken');
const table = "user";
const aa = {
  "-97":"登陆成功",
  "-98":"用户名不存在",
  "-99":"密码错误"
}
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
  let code = 0;
  let data = {};
  if (!datas[0]) {
    code = -98;
  } else if (datas[0].password != common.md5(ctx.config.ADMIN_PREFIX + password)) {
    code = -99;
  } else {
    let token = addtoken({username:datas[0].username,id:datas[0].id})  //token中要携带的信息，自己定义
    data={
      username,
      token
    }
  }
  /* 返回页面参数*/
    ctx.body = {
      code,
      msg:aa[code],
      status: 200,
      data
    };
});


module.exports = router.routes();