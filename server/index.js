const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const path = require('path');
const fs = require('fs');
const static = require('koa-static');
const session = require('koa-session');
const body = require('koa-better-body');
const config=require('./config');

const server = new Koa();

//这是处理前端跨域的配置
// server.use(cors({
//   origin: function (ctx) {
//     if (ctx.url === '/login') {
//       return "*"; // 允许来自所有域名请求
//     }
//     return 'http://localhost:8080';
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));
    

//中间件
server.use(body({
  uploadDir: path.resolve(__dirname, './static/upload')
}))
// server.keys = fs.readFileSync('.keys').toString().split('\n');
// server.use(session({
//   maxAge: 1 * 60 * 1000,
//   renew: true,
// }, server))
//数据库
server.context.db = require('./libs/database');
server.context.config=config;

//路由和static

// router.post('/login',async ctx=>{
//   let {username,password} = ctx.request.fields;
  
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;

//   let data = {
//     code:0,
//     msg:"登录成功",
//     data:{
//       loginNum:n
//     }
//   }
//   ctx.body = JSON.stringify(data); 
// })
// router.get('/userInfo',async ctx=>{
//   console.log(ctx.cookie);
//   let data  = ctx;
  
//   ctx.body = JSON.stringify(data); 
// })
router.use('/login', require('./router/login'));

server.use(router.routes());

server.listen(8888,()=>{
  console.log(`启动成功，端口号8888`);
});