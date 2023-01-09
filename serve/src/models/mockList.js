const { models } = require("../sequelize/index");

const BaseModel = require("./BaseModel");

class MockList extends BaseModel {
  init() {
    this.orm = models.mock_list;
  }

  // 单个增加
  add(data) {
    return this.get({
      path: data.path,
    }).then((result) => {
      if (result) {
        return new Promise((resolve, reject) => {
          reject("path重复");
        });
      }
      return this.orm.create(data);
    });
  }

  // 分页查询
  batchGetPage(obj, { page = 1, pageSize = 20 }) {
    let offset = (page - 1) * pageSize;
    return this.orm.findAndCountAll({
      where: obj,
      include: [
        {
          model: models.mock_group,
          attributes: ['id', 'name']
        }
      ],
      limit: parseInt(pageSize),
      offset,
    });
  }
}

module.exports = new MockList();
