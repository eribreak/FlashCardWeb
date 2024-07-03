import { Response, Request } from "express";
import {
  BadRequest,
  HttpErrorResponse,
  InvalidParameter,
  MissingParameter,
} from "../lib/http.reponse";
import Logger from "../lib/logger";
import { validateService } from "../service/validate.service";
import { prisma } from "../database/postgresql/connect.postgresql";

class AuthController {
  async sign_up(
    req: Request<any, any, { name: string; password: string; email: string }>,
    res: Response
  ) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw new MissingParameter();
      }

      if (
        !validateService.validateEmail(email) ||
        !validateService.validatePassword(password)
      ) {
        throw new InvalidParameter();
      }

      const existUser = await prisma.user.findFirst({ where: { email } });

      if (existUser) {
        throw new BadRequest("Email is already exists");
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
        },
      });
      return res.status(200).json({ data: newUser });
    } catch (error: any) {
      console.log(error.stack);
      const err = new HttpErrorResponse(error.message, error.statusCode);
      return res.status(err.statusCode).json({ message: err.message });
    }
  }

  async login(
    req: Request<any, any, { password: string; email: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new MissingParameter();
      }

      if (
        !validateService.validateEmail(email) ||
        !validateService.validatePassword(password)
      ) {
        throw new InvalidParameter();
      }

      const existUser = await prisma.user.findFirst({
        where: { email },
      });

      if (!existUser) {
        throw new BadRequest("Email is not exists");
      }

      if (existUser.password !== password) {
        throw new BadRequest("Password is incorrect");
      }

      return res.status(200).json({
        data: await prisma.user.findFirst({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            phoneNumber: true,
          },
        }),
      });
    } catch (error: any) {
      console.log(error.stack);
      const err = new HttpErrorResponse(error.message, error.statusCode);
      return res.status(err.statusCode).json({ message: err.message });
    }
  }

  /**
   * * update user information
   */

  async updateUser(
    req: Request<
      any,
      any,
      { name: string; password: string; email: string; phoneNumber: string }
    >,
    res: Response
  ) {
    try {
      const { name, password, email, phoneNumber } = req.body;

      if (!password || !email) {
        throw new MissingParameter();
      }

      const updatedUser = await prisma.user.update({
        where: {
          email,
          password,
        },
        data: {
          name,
          phoneNumber,
        },
      });

      return res.status(200).json({ data: updatedUser });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
  async requestToClass(
    req: Request<any, any, { classId: number; userId: number }>,
    res: Response
  ) {
    try {
      const { classId, userId } = req.body;

      if (!classId || !userId) {
        throw new MissingParameter();
      }

      const request = await prisma.class.update({
        where: {
          id: classId,
        },
        data: {
          requests: {
            create: {
              fromUser: {
                connect: {
                  id: userId,
                },
              },
            },
          },
        },
        include: {
          requests: true,
        },
      });

      return res.status(200).json({ data: request });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
  async removeRequest(
    req: Request<any, any, { requestId: number }>,
    res: Response
  ) {
    try {
      const { requestId } = req.body;
      if (!requestId) {
        throw new MissingParameter();
      }

      await prisma.request.delete({
        where: {
          id: requestId,
        },
      });

      return res.status(200).json({ message: "Deleted" });
    } catch (error: any) {
      const err = new HttpErrorResponse(
        String(error?.message),
        Number(error?.statusCode || 500)
      );

      console.log(error);
      return res.status(err.statusCode).json(err.message);
    }
  }
  async addStudent(
    req: Request<any, any, { classId: number; userId: number }>,
    res: Response
  ) {
    try {
      const { classId, userId } = req.body;
      console.log(req.body);

      if (!classId || !userId) {
        throw new MissingParameter();
      }

      const newStudent = await prisma.class.update({
        where: {
          id: classId,
        },
        data: {
          studyAt: {
            create: {
              studentId: userId,
            },
          },
        },
      });

      const request = await prisma.request.findFirst({
        where: {
          inClass: classId,
          fromUserId: userId,
        },
      });

      if (request) {
        await prisma.request.delete({
          where: {
            id: request.id,
          },
        });
      }

      return res.status(200);
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

const authController = new AuthController();
export default authController;
