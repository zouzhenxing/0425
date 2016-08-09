'use strict';

let adminRouter = express.Router();
adminRouter.get("/index",adminService.index);

/*admin restful webAPI规范 模块路由*/
adminRouter.get("/admin",adminService.admin);
adminRouter.put("/admin",adminService.goAddAdmin);
adminRouter.post("/admin",adminService.addAdmin);
adminRouter.delete("/admin",adminService.delAdmin);

/*admin types模块*/
adminRouter.get("/types",adminService.typesMana);
adminRouter.put("/types",adminService.goAddType);
adminRouter.post("/types",adminService.addType);

/*admin goods模块*/
adminRouter.get("/goods",adminService.listGoods);
adminRouter.put("/goods",adminService.goAddGoods);
adminRouter.post("/goods",upload.single('img'),adminService.addGoods);

/*admin news模块 */
adminRouter.get("/news",adminService.listNews);
adminRouter.put("/news",adminService.goAddNews);
adminRouter.post("/news",adminService.addNews);
adminRouter.get("/news/:nid",adminService.preview);

/*文件上传 */
adminRouter.post("/upfile",upload.single('img'),adminService.upfile);

module.exports = adminRouter;