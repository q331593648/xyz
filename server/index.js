const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const path = require('path');
const static = require('koa-static');
const body = require('koa-better-body');
const config=require('./config');
const koajwt = require('koa-jwt');

const server = new Koa();

//这是处理前端跨域的配置
server.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; 
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 错误处理
server.use(async (ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
        ctx.body = {
          code:50014,
          msg:"token过期"
        }
      }else{
          throw err;
      }
  })
})



//中间件
server.use(body())
server.use(koajwt({
	secret: config.tokenSecret
}).unless({
	path: [/\/login/]
}));

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
// router.use('/login', require('./router/login'));
// router.use('/register', require('./router/register'));
// router.use('/reptile', require('./router/reptile'));
router.use('/', require('./router/user'));

server.use(router.routes());

server.listen(8888,()=>{
  console.log(`启动成功，端口号8888`);
});