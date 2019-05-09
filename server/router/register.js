const router = require('koa-router')();
const common = require('../libs/common');
const jwt = require('jsonwebtoken');
const addtoken = require('../token/addtoken');
const table = "user";
const aa = {
  "-96":"注册成功",
  "-95":"用户名已存在"
}
router.post('/', async ctx => {
  /* 获取帐号密码*/
  let {
    username,
    password
  } = ctx.request.fields;

  /* 检查帐号密码*/

  /* 查询帐号信息*/
  let count =  await ctx.db.query(`SELECT count(username) num FROM ${table} where username = ?`, [username]);
  let num = count[0].num;
  /* 判断帐号*/
   let code = -96;
  // let data = {};
  // if (!datas[0]) {
  //   code = -98;
  // } else if (datas[0].password != common.md5(ctx.config.ADMIN_PREFIX + password)) {
  //   code = -99;
  // } else {
  //   let token = addtoken({username:datas[0].username,id:datas[0].id})  //token中要携带的信息，自己定义
  //   data={
  //     username,
  //     token
  //   }
  // }
  /* 返回页面参数*/
    ctx.body = {
      code,
      msg:aa[code],
      status: 200,
      data:num
    };
});


module.exports = router.routes();