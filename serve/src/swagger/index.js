const path = require('path');
const swaggerUI = require('swagger-ui-koa');
const convert = require('koa-convert');
const mount = require('koa-mount');
const swaggerDoc = require('swagger-jsdoc')
//配置swagger-jsdoc
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'api',
        version: '1.0.0',
        description: `后台接口api`
      }
    },
    // 去哪个路由下收集 swagger 注释
    apis: [path.join(__dirname,'../routers/*.jsx')]
  }
var swaggerJson = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  }
  const swaggerSpec = swaggerDoc(options)

  var swaggerInstall = function(app) {
    // 开放相关接口，
    // app.use('/swagger.json', swaggerJson);
    // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
    app.use(swaggerUI.serve);
    app.use(convert(mount('/swagger', swaggerUI.setup(swaggerSpec))));
  }
  module.exports = swaggerInstall
