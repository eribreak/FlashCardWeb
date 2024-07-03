import { IClass } from "./ClassApi";
import { Api } from "./api";

interface ICreateAccountRequest {}

interface ILoginRequest {
  username: string;
  password: string;
}
export interface IUser {
  name: string;
  id: number;
  email: string;
  phoneNumber: string | null;
  password: string;
}

export interface IRequest {
  id: number;
  inClass: number;
  fromUserId: number;
}

interface IchangeInforRequest {}

class AuthenticateApi extends Api {
  constructor(route: string = "/auth") {
    super();
    this.connect(route);
  }

  SignUp(name: string, password: string, email: string) {
    return this.api.post<{
      data: IUser;
    }>("/sign-up", {
      name,
      password,
      email,
    });
  }

  Login(password: string, email: string) {
    return this.api.post<{ data: IUser | null }>("/login", {
      password,
      email,
    });
  }

  ChangeUserInfor(
    name: string,
    password: string,
    email: string,
    phoneNumber: string
  ): Promise<any> {
    return this.api.patch<{ data: IUser }>("/user/update-user", {
      name,
      password,
      email,
      phoneNumber,
    });
  }

  requestToClass(classId: number, userId: number) {
    return this.api.post<{
      data: {
        requests: IRequest[];
      } & IUser;
    }>("/user/request-to-class", {
      classId,
      userId,
    });
  }

  removeRequest(requestId: number) {
    return this.api.delete<{
      message: "Deleted";
    }>("/user/remove-requets", {
      data: {
        requestId,
      },
    });
  }

  addStundet(classId: number, userId: number) {
    return this.api.post<{
      message: "Deleted";
    }>("/user/add_student", {
      classId,
      userId,
    });
  }

  
}
const authApi = new AuthenticateApi();
export default authApi;
