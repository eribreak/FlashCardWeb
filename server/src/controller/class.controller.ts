import { HttpErrorResponse, MissingParameter } from "../lib/http.reponse";
import { Response, Request } from "express";
import classService from "../service/class.service";
import { prisma } from "../database/postgresql/connect.postgresql";
import { boolean } from "zod";

class ClassController {
  async createClass(
    req: Request<
      any,
      any,
      { userId: string; classInfo: { name: string; images: string } }
    >,
    res: Response
  ) {
    try {
      console.log(req.body);
      const { userId, classInfo } = req.body;
      if (!userId || !classInfo || !classInfo.name) {
        throw new MissingParameter();
      }

      const newClass = await classService.createClass(
        Number(userId),
        classInfo.name,
        classInfo.images
      );

      return res.status(200).json({ data: newClass });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
  async addStudents(
    req: Request<
      any,
      any,
      { hostId: string; classId: string; studentIds: string[] }
    >,
    res: Response
  ) {
    try {
      const { hostId, classId, studentIds } = req.body;
      console.log(studentIds);

      if (!hostId || !classId || !studentIds || !(studentIds.length > 0)) {
        throw new MissingParameter();
      }

      const myclass = await classService.addStudents(
        Number(hostId),
        Number(classId),
        studentIds.map((item) => Number(item))
      );

      return res.status(200).json({ data: myclass });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async removeStudent(
    req: Request<
      any,
      any,
      { hostId: string; classId: string; studentIds: string[] }
    >,
    res: Response
  ) {
    try {
      const { hostId, classId, studentIds } = req.body;
      console.log(studentIds);

      if (!hostId || !classId || !studentIds || !(studentIds.length > 0)) {
        throw new MissingParameter();
      }

      const myclass = await classService.deleteStudents(
        Number(hostId),
        Number(classId),
        studentIds.map((item) => Number(item))
      );

      return res.status(200).json({ data: myclass });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async createAssignment(
    req: Request<
      any,
      any,
      {
        hostId: string;
        classId: string;
        assignment: {
          question: string;
          due: string;
        };
      }
    >,
    res: Response
  ) {
    try {
      const { hostId, classId, assignment } = req.body;

      if (!hostId || !classId || !assignment || !assignment.question) {
        throw new MissingParameter();
      }

      const myclass = await classService.createAssignment(
        Number(hostId),
        Number(classId),
        assignment.question,
        assignment.due
      );

      return res.status(200).json({ data: myclass });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async updateClass(
    req: Request<
      any,
      any,
      {
        hostId: number;
        classId: number;
        images?: string;
        name?: string;
      }
    >,
    res: Response
  ) {
    try {
      const { images, name, hostId, classId } = req.body;
      if (!hostId || !classId || !images || !name) {
        throw new MissingParameter();
      }

      const data = await prisma.class.update({
        where: {
          hostId: hostId,
          id: classId,
        },
        data: {
          name: name,
          images: images,
        },
      });

      return res.status(200).json({ data: data });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async viewClass(
    req: Request<
      any,
      any,
      any,
      { filter?: "all"; name?: string; hostId?: string }
    >,
    res: Response
  ) {
    try {
      const { filter, name, hostId } = req.query;

      let data;
      console.log(name);

      if (hostId) {
        if (name) {
          data = await prisma.class.findMany({
            where: {
              hostId: Number(hostId),
              name: {
                contains: String(name),
              },
            },
            include: {
              host: true,
              collections: true,
              assignments: true,
              posts: true,
            },
          });
        } else {
          data = await prisma.class.findMany({
            where: {
              hostId: Number(hostId),
            },
          });
        }
      } else {
        if (name) {
          data = await prisma.class.findMany({
            where: {
              name: {
                contains: String(name),
              },
            },
          });
        } else {
          data = await prisma.class.findMany({});
        }
      }
      return res.status(200).json({ data: data });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
  async createPost(
    req: Request<
      any,
      any,
      {
        hostId: number;
        classId: number;
        content: string;
        createrId: number;
      }
    >,
    res: Response
  ) {
    try {
      const { hostId, classId, content, createrId } = req.body;

      console.log(req.body);
      if (!hostId || !classId || !content || !createrId) {
        throw new MissingParameter();
      }

      const newPost = await prisma.class.update({
        where: {
          hostId: hostId,
          id: classId,
        },
        data: {
          posts: {
            create: {
              content: content,
              date: new Date(),
              byMemberId: createrId,
            },
          },
        },
        include: {
          posts: true,
        },
      });

      return res.status(200).json({ data: newPost });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async AnwserAss(
    req: Request<
      any,
      any,
      {
        hostId: number;
        classId: number;
        assignmentId: number;
        answer: string;
        student: string;
      }
    >,
    res: Response
  ) {
    try {
      const { hostId, classId, assignmentId, answer, student } = req.body;
      if (!hostId || !classId || !assignmentId || !answer || !student) {
        throw new MissingParameter();
      }

      const newAns = await prisma.class.update({
        where: {
          id: classId,
          hostId: hostId,
        },
        data: {
          assignments: {
            update: {
              where: { id: assignmentId },
              data: {
                answers: {
                  create: {
                    answer: answer,
                    student: student,
                  },
                },
              },
            },
          },
        },
        include: {
          assignments: {
            include: { answers: true },
          },
        },
      });

      return res.status(200).json({ data: newAns });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
  async viewDetailClass(
    req: Request<any, any, any, { id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.query;
      if (!id) {
        throw new MissingParameter();
      }
      const classInfo = await prisma.class.findFirst({
        where: { id: Number(id) },
        include: {
          studyAt: {
            include: {
              student: true,
            },
          },
          collections: true,
          assignments: true,
          posts: {
            include: {
              byMember: true,
            },
          },
          requests: true,
        },
      });
      return res.status(200).json({ data: classInfo });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async viewStudyAt(req: Request<any, any>, res: Response) {
    try {
      const { id } = req.query;
      const studyAtInfo = await prisma.studyAt.findMany({
        where: { studentId: Number(id) },
      });
      // const classInfo = classes.map(item => item.class);

      console.log(studyAtInfo);
      return res.status(200).json({ data: studyAtInfo });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }

  async addStudentWithEmails(
    req: Request<
      any,
      any,
      { hostId: string; classId: string; emails: string[] }
    >,
    res: Response
  ) {
    try {
      const { hostId, classId, emails } = req.body;
      console.log(emails);

      if (!hostId || !classId || !emails || !(emails.length > 0)) {
        throw new MissingParameter();
      }

      let studentIds: Number[] = [];
      emails.forEach(async (email) => {
        let id = (await prisma.user.findFirst({ where: { email: email } }))?.id;
        id && studentIds.push(id);
      });

      const myclass = await classService.addStudents(
        Number(hostId),
        Number(classId),
        studentIds.map((item) => Number(item))
      );

      return res.status(200).json({ data: myclass });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
}

const classController = new ClassController();
export default classController;
