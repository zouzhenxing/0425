'use strict';
let loginRouter = express.Router();
loginRouter.post("/login",loginService.login);
loginRouter.get("/logout",loginService.logout);
module.exports = loginRouter;