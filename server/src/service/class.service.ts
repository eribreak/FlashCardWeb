import { prisma } from "../database/postgresql/connect.postgresql";
import { HttpErrorResponse } from "../lib/http.reponse";

class ClassService {
  async createClass(hostId: number, name: string, images?: string) {
    try {
      const newClass = await prisma.user.update({
        where: { id: hostId },
        data: {
          hosted: {
            create: {
              name: name,
              images,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          hosted: true,
        },
      });

      return newClass;
    } catch (error: any) {
      console.log(error.stack);
      throw new HttpErrorResponse(error.message, error.statusCode);
    }
  }

  async addStudents(hostId: number, classId: number, studentIds: number[]) {
    try {
      const myclass = await prisma.class.update({
        where: { id: classId, hostId: hostId },
        data: {
          studyAt: {
            createMany: {
              data: studentIds.map((studentId) => {
                return {
                  studentId: studentId,
                };
              }),
            },
          },
        },
        include: {
          studyAt: true,
        },
      });

      return myclass;
    } catch (error: any) {
      console.log(error.stack);
      throw new HttpErrorResponse(error.message, error.statusCode);
    }
  }
  async deleteStudents(hostId: number, classId: number, studentIds: number[]) {
    try {
      const myclass = await prisma.class.update({
        where: { id: classId, hostId: hostId },
        data: {
          studyAt: {
            deleteMany: studentIds.map((studentId) => {
              return { studentId: Number(studentId) };
            }),
          },
        },
        include: {
          studyAt: true,
        },
      });

      return myclass;
    } catch (error: any) {
      console.log(error.stack);
      throw new HttpErrorResponse(error.message, error.statusCode);
    }
  }

  async createAssignment(
    hostId: number,
    classId: number,
    question: string,
    due?: string
  ) {
    try {
      const myclass = await prisma.class.update({
        where: { id: classId, hostId: hostId },
        data: {
          assignments: {
            create: {
              question,
              due,
            },
          },
        },
        include: {
          assignments: true,
        },
      });

      return myclass;
    } catch (error: any) {
      console.log(error.stack);
      throw new HttpErrorResponse(error.message, error.statusCode);
    }
  }

  async updateClass(
    hostId: number,
    classId: number,
    collectionIds?: Number[],
    images?: string
  ) {
    try {
    } catch (error: any) {
      console.log(error.stack);
      throw new HttpErrorResponse(error.message, error.statusCode);
    }
  }
}

const classService = new ClassService();
export default classService;
