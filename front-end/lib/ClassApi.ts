import axios from "axios";
import { Api } from "./api";
import { IUser } from "./authApi";
import { ICollection } from "./CollectionApi";
import { ICreateClassRequest } from "@/app/home/class/create-class/page";

interface IClassRequest {
  _id: string;
  name: string;
  images?: string;
  hostId?: string;
}
export interface IClass {
  id: number;
  name: string;
  images?: string | null;
  hostId: number | null;
  description: string | null;
}

export interface IAnswer {
  id: number;
  answer: string;
  student: string;
  point?: string;
}

export interface IAssigment {
  id: number;
  question: string;
  due: string;
  answers: IAnswer[];
  description: string;
}

export interface IPost {
  id: number;
  date: string;
  content: string;
  byMemberId: number;
  byMember: IUser;
}

export interface IRequest {
  id: number;
  fromUserId: number;
}

export interface IClassDetails extends IClass {
  studyAt:
    | []
    | {
        classId: number;
        studentId: number;
        student: IUser;
      }[];
  collections: ICollection[] | [];
  assignments: IAssigment[] | [];
  posts: IPost[] | [];
  requests: IRequest[] | [];
}

class ClassApi extends Api {
  constructor(route: string = "/class") {
    super();
    this.connect(route);
  }

  createClass(data: ICreateClassRequest): Promise<any> {
    return this.api.post<{ data: IClass }>("/create-class", {
      ...data,
    });
  }

  updateClass(data: IClassRequest): Promise<any> {
    return this.api.patch("/create-class", {
      data,
    });
  }

  addStudent(data: { hostId: string; classId: string; studentIds: string[] }) {
    return this.api.post("/add-student", { data: data });
  }

  ViewAllClasses(filter?: "all", name?: string, hostId?: string) {
    const params = new URLSearchParams();

    if (filter) {
      params.append("filter", filter);
    }
    if (name) {
      params.append("name", name);
    }
    if (hostId) {
      params.append("ownerId", hostId);
    }
    return this.api.get<{
      data: IClass[];
    }>(`/view-class?${params.toString()}`);
  }

  addStudentByEmail(hostId: string, classId: string, email: string[]) {
    return this.api.post<{ data: IClass }>("/add-students-with-emails", {
      hostId,
      classId,
      email,
    });
  }
  createPost(data: {
    hostId: number;
    classId: number;
    content: string;
    createrId: number;
  }) {
    return this.api.post("/create-post", {
      ...data,
    });
  }

  viewDetailClass(id: number) {
    return this.api.get<{
      data: IClassDetails;
    }>(`/view-detail-class?id=${id}`);
  }
  viewStudyAt(id: number) {
    return this.api.get<{
      data: IClass[];
    }>(`/view-study-at?id=${id}`);
  }
  createAssignment(
    hostId: string,
    classId: string,
    assignment: {
      question: string;
      due: string;
    }
  ) {
    return this.api.post<{ data: IClass }>("/create-assignment", {
      classId,
      hostId,
      assignment,
    });
  }
}

const classApi = new ClassApi();
export default classApi;
