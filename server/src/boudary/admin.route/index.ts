import { Router } from "express";
import adminController from "../../controller/admin.controller";
import { list } from "@sequelize/core/lib/expression-builders/list";
import { auth } from "google-auth-library";

const adminRouter = Router();

/**
 * * login with email and password
 */

// adminRouter.use(adminController.login);
adminRouter.post("/login", adminController.login);

/**
 * * View user list
 */
// xem ds ng dung
adminRouter.get("/view-users", adminController.viewUserList);

// xem ds class
adminRouter.get("/view-class", adminController.viewClassList);

// // xoa user
// adminRouter.delete("/delete-user", adminController.removeUser);
// sua tt user
adminRouter.post("/update-user", adminController.updateUser);
// // xoa class
// adminRouter.post("/delete-class", adminController.removeClass);
// sua class
adminRouter.post("/update-class", adminController.updateClass);


export default adminRouter;
