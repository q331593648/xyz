const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const Mysql = require('mysql');
const co = require('co-mysql');
const static = require('koa-static');
const session = require('koa-session');
const body = require('koa-better-body');

const server = new Koa();



//中间件
server.use(body({
  uploadDir: path.resolve(__dirname, './static/upload')
}))
server.keys = fs.readFileSync('.keys').toString().split('\n');
server.use(session({
  maxAge: 20 * 60 * 1000,
  renew: true,
}, server))

//数据库
server.context.db = require('./libs/database');

//路由和static
let router = new Router();

router.post('/login',async ctx=>{
  let {username,password} = ctx.request.fields;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;

  let data = {
    code:0,
    msg:"登录成功",
    data:{
      loginNum:n
    }
  }
  ctx.body = JSON.stringify(data); 
})


server.use(router.routes());

server.listen(8888,()=>{
  console.log(`启动成功，端口号8888`);
});