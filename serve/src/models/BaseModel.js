module.exports = class BaseModel {
  constructor() {
    this.init();
  }

  init() {
    // 子类必需重写该方法
    // this.orm = models.user;
  }
  // 单个查询
  get(data) {
    return this.orm.findOne({
      where: data,
    });
  }

  // 全部查询
  findAll() {
    return this.orm.findAll();
  }

  // 批量查询
  batchGet(obj) {
    return this.orm.findAll({
      where: obj,
    });
  }

  // 分页查询
  batchGetPage(obj, { page = 1, pageSize = 20 }) {
    let offset = (page - 1) * pageSize;
    return this.orm.findAndCountAll({
      where: obj,
      limit: parseInt(pageSize),
      offset,
    });
  }

  // 单个增加
  add(data) {
    return this.orm.create(data);
  }

  // 单个移出 传null表示删除全部
  remove(data) {
    if (Object.keys(data).length > 0) {
      return this.orm
        .destroy({
          where: data,
        })
        .then(
          (result) =>
            new Promise((resolve, reject) => {
              resolve("ok");
            })
        );
    }
    return this.orm
      .destroy({
        truncate: true,
        cascade: false,
      })
      .then(
        (result) =>
          new Promise((resolve, reject) => {
            resolve("ok");
          })
      );
  }

  /**
   * 批量删除，传入要删除的数据的要求什么的。
   * obj 格式示例 obj = {
   *                  id: idsArray,
   *              }
   */
  batchRemove(obj) {
    return this.orm
      .destroy({
        where: obj,
      })
      .then(
        () =>
          new Promise((resolve) => {
            resolve("ok");
          })
      );
  }

  // 单个更新
  update(obj) {
    return this.get({
      id: obj.id,
    }).then((result) => {
      if (result) {
        return this.orm
          .update(obj, {
            where: {
              id: obj.id,
            },
          })
          .then(
            () =>
              new Promise((resolve) => {
                resolve("ok");
              })
          );
      }
      return new Promise((resolve, reject) => {
        reject("没有匹配到,请检查id");
      });
    });
  }

  addOrUpdate(data) {
    const self = this;
    return this.get({
      id: data.id,
    }).then((result) => {
      if (result) {
        return self.update(data);
      }
      return self.add(data);
    });
  }

  batchAddOrUpdate(data) {
    const self = this;
    return Promise.each(data, (d) => self.addOrUpdate(d));
  }
};
