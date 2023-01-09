
/**
 * @swagger
 * /api/v1/mock/list:
 *    get:
 *      tags:
 *      - mock
 *      summary: 获取列表
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: page
 *        in: query
 *        description: 第几页
 *        default: "1"
 *        required: false
 *      - name: pageSize
 *        in: query
 *        description: 一页有多少数据
 *        default: "20"
 *        required: false
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */




/**
 * @swagger
 * /api/v1/mock/add:
 *    post:
 *      tags:
 *      - mock
 *      summary: 添加mock数据
 *      description:
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             path:
 *               type: "string"
 *               default: "/user/getData"
 *               description: 路径地址
 *             name:
 *               type: "string"
 *               default: "获取数据"
 *               description: 路径描述
 *             remarks:
 *               type: "string"
 *               default: ""
 *               description: 备注
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
