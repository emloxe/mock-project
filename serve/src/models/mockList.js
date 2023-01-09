const { models } = require("../sequelize/index");

const BaseModel = require("./BaseModel");

class MockList extends BaseModel {
  init() {
    this.orm = models.mock_list;
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
