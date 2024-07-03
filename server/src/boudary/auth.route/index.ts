import { Router } from "express";
import authController from "../../controller/auth.controller";

const authRouter = Router();

/**
 * * create a new user
 */
authRouter.post("/sign-up", authController.sign_up);

/**
 * * login with email and password
 */
authRouter.post("/login", authController.login);
// authRouter.post('/forgot-password', authController.sign_up);

/**
 * * Update user infomation with email and passwod
 */

authRouter.patch("/user/update-user", authController.updateUser);

authRouter.post("/user/request-to-class", authController.requestToClass);
authRouter.delete("/user/remove-requets", authController.removeRequest);
authRouter.post("/user/add_student", authController.addStudent);

export default authRouter;
