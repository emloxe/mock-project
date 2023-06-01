const Router = require("koa-router"),
  uuid = require("uuid"),
  md5 = require("md5");
const Mock = require("mockjs");

const model = require("../models/mockList");


const router = new Router();

router.prefix(`/mock`);


const getBirthday = ()=> {  // 生日
  const year =   (new Date().getFullYear() - 50) + Math.round(Math.random()*50);
  const month =  Math.round(Math.random()*12).toString().padStart(2, '0');
  const date =  Math.round(Math.random()*30).toString().padStart(2, '0');
   return year.toString() + month + date;
 } ;

// 身份证号
function getId_no(){
  var coefficientArray = [ "7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];// 加权因子
  var lastNumberArray = [ "1","0","X","9","8","7","6","5","4","3","2"];// 校验码
  var address = "420601"; // 住址
  var birthday = getBirthday()
  var s = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString();
  var array = (address + birthday + s).split("");
  var total = 0;
  for(i in array){
    total = total + parseInt(array[i])*parseInt(coefficientArray[i]);
  }
  var lastNumber = lastNumberArray[parseInt(total%11)];
  var id_no_String = address + birthday + s + lastNumber;

  return id_no_String

}


Mock.Random.extend({
  // 时间 @TIME只有时间
  date: function() { // @DATE
    return this.time('yyyy-MM-dd');
  },
  timefull: function() { // @timefull
    return this.time('yyyy-MM-dd HH:mm:ss');
  },
  constellation: function() { // @constellation
    var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellations);
  },
  idcard: function() {
    return getId_no()
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
