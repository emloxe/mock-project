const { models } = require("../sequelize/index");

const BaseModel = require("./BaseModel");

class MockGroup extends BaseModel {
  init() {
    this.orm = models.mock_group;
  }
}

module.exports = new MockGroup();
