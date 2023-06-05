const Router = require("koa-router"),
  uuid = require("uuid"),
  md5 = require("md5");
const config = require("../config");
const model = require("../models/mockList");

const router = new Router();

router.prefix(`${config.api}/mockList`);


// 获取数据
router.get("/list", async (ctx) => {
  let { group_id } = ctx.query;
  let all = await model.batchGet({group_id: group_id});
  ctx.body = {
    code: 0,
    data: {
      list: all,
    },
  };
});


// 创建分组
router.post("/add", async (ctx) => {
  let data = ctx.request.body;
  await model
    .add(data)
    .then((returnData) => {
      ctx.body = { code: 0, msg: "添加成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = {
        code: 1,
        msg:  Object.prototype.toString.call(reason)=="[object String]" ? reason :  "添加出错",
        error: reason,
      };
    });
});


// 更新数据
router.put("/update", async (ctx) => {
  let data = ctx.request.body;
  await model
    .update(data)
    .then((returnData) => {
      ctx.body = { code: 0, msg: "更新成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = {
        code: 1,
        msg: "更新出错",
        error: reason,
      };
    });
});


// 删除
router.delete("/delete", async (ctx) => {
  let data = ctx.request.body;
  await model
    .remove({ ...data })
    .then((returnData) => {
      ctx.body = { code: 0, msg: "删除成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = { code: 1, msg: "删除出错", error: reason };
    });
});

module.exports = router;
