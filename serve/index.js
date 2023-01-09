const app = require("./src/app");
const sequelize = require("./src/sequelize");
const chalk = require("chalk");

const conf = require("./src/config"); // 默认配置

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    // 自动同步所有模型，如果表不存在，就创建该表，破坏性操作，慎用
    await sequelize.sync({ force: true });
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  console.log(`[${new Date().toLocaleString()}]`);
  await assertDatabaseConnectionOk();
  // 开启端口监听
  app.listen(conf.port);
  console.log(
    chalk.green("INFO"),
    " connect to",
    chalk.underline(`http://127.0.0.1:${conf.port}`)
  );
}

init();
