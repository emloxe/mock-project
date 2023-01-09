const Router = require("koa-router"),
  uuid = require("uuid"),
  md5 = require("md5");
const config = require("../config");
const model = require("../models/mockGroup");

const router = new Router();

router.prefix(`${config.api}/mockGroup`);

// 获取数据
router.get("/list", async (ctx) => {
  let all = await model.findAll();
  ctx.body = {
    code: 0,
    data: {
      list: all,
      total: all.length, // 总共有多少条数据
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
        msg: "添加出错",
        error: reason,
      };
    });
});


// 删除分组
router.delete("/delete/one", async (ctx) => {
  let data = ctx.request.body;
  await model
    .remove({ id: data.id })
    .then((returnData) => {
      ctx.body = { code: 0, msg: "删除成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = { code: 1, msg: "删除出错", error: reason };
    });
});

module.exports = router;
