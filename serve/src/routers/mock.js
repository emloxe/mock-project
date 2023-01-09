const Router = require("koa-router"),
  uuid = require("uuid"),
  md5 = require("md5");
const Mock = require("mockjs");

const model = require("../models/mockList");


const router = new Router();

router.prefix(`/mock`);


Mock.Random.extend({
  // 时间 @TIME只有时间
  date: function() { // @DATE
    return this.time('yyyy-MM-dd');
  },
  timefull: function() { // @TIMEFULL
    return this.time('yyyy-MM-dd HH:mm:ss');
  },
  pic: function() { // @PIC
    return this.dataImage('200x200')
  },
  // 名字 @NAME 英文名 @CNAME 中文名
  constellation: function() { // @CONSTELLATION
    var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellations);
  }
})


// 获取数据
router.get("/:path", async (ctx) => {
  const {path} = ctx.params;

  let one = await model.get({path});
  if(one) {
    var obj = eval('(' + one.code + ')');
    ctx.body = {
      ...Mock.mock(obj)
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '未成功解析数据'
    };
  }

});



module.exports = router;
