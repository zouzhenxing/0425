'use strict';
let apiRouter = express.Router();
apiRouter.post("/login",apiService.login);
module.exports = apiRouter;