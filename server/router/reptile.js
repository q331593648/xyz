const router = require('koa-router')();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')

router.post("/", async ctx => {
  let {
    pageSize,
    pageNo
  } = ctx.request.fields;
  let imgDatas = await getPic(pageNo);
  ctx.body = {
    data: imgDatas,
    message: '图片加载成功'
  }
})

const getPic = async (num) => {
  //启动
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0
  });
  // 打开空白页面
  const page = await browser.newPage();
  // 设置浏览器视窗
  await page.setViewport({
    width: 1200,
    height: 800
  });
  //打开页面
  await page.goto(`https://pixabay.com/images/search/?pagi=${num}`);
  //保存网页为图片
  await page.screenshot({
    path: xx.png,
    fullPage: true //截取整个屏
  });
  //滚动到最底下--懒加载处理
  await autoScroll(page);

/*
 Page.$ 可以理解为我们常用的 document.querySelector
 Page.$$ 则对应 document.querySelectorAll
*/


  let count = await page.$eval('.add_search_params.pure-form', el => el.innerHTML.split("/")[1].split('&')[0].trim())

  let list = await page.$$eval('div.item',
    items => {
      return items.map(item => {
        return item.querySelector("img").src
      })
    }
  );

  let data = {
    list,
    count
  }
  //关闭
  await browser.close();
  return data;
}


/**
 * 
 * @param {*} page 页面事件
 * @event  从顶部滚动到底部
 */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 1000;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(scrollHeight, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
module.exports = router.routes()