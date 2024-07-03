import { Request, Response, Router } from "express";
import classController from "../../controller/class.controller";
const classRouter = Router();

// * create a new class
classRouter.post("/create-class", classController.createClass);
classRouter.post("/add-students", classController.addStudents);
classRouter.post(
  "/add-students-with-emails",
  classController.addStudentWithEmails
);

classRouter.delete("/remove-students", classController.removeStudent);
classRouter.post("/create-assignment", classController.createAssignment);

classRouter.get("/view-class", classController.viewClass);
classRouter.get("/view-detail-class", classController.viewDetailClass);

classRouter.patch("/update-class", classController.updateClass);

// TODO: create post
classRouter.post("/create-post", classController.createPost);

// * find my class
// TODO : Anwser assignment
classRouter.post("/awnser-assignment", classController.AnwserAss);

classRouter.get("/view-study-at", classController.viewStudyAt);

classRouter.get("/");

export default classRouter;
