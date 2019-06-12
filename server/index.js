const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const static = require('koa-static');
const body = require('koa-better-body');
const config=require('./config');
const koajwt = require('koa-jwt');
const fs = require('fs');
const cors = require('koa2-cors');

const server = new Koa({});

//这是处理前端跨域的配置
server.use(cors({credentials: true}));

// 错误处理
server.use(async (ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
        ctx.body = {
          code:50014,
          message:"token过期"
        }
      }else{
          throw err;
      }
  })
})



//中间件
//解析请求参数
server.use(body());

//验证token
server.use(koajwt({
	secret: config.tokenSecret
}).unless({
	path: [/\/login/]
}));

// server.keys=fs.readFileSync('.keys').toString().split('\n');

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
//     message:"登录成功",
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
// router.use('/login', require('./router/login'));
// router.use('/register', require('./router/register'));
// router.use('/reptile', require('./router/reptile'));
router.use('/', require('./router/user'));

server.use(router.routes());

server.listen(8111,()=>{
  console.log(`启动成功，端口号8888`);
});