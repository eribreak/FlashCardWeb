import { Api } from "./api";
import { IUser } from "./authApi";
import { ICollection } from "./CollectionApi";
import { IClass } from "./ClassApi";
import exp from "constants";

interface IUserData {
    id: number;
    name: string;
    password: string;
    email: string;
    phoneNumber: string | null;
}

interface IClassData {
    id: number;
    name: string;
    images: string;
    hostId: number;
    description: string;
}

class AdminApi extends Api {
    constructor(route: string = "/admin") {
        super();
        this.connect(route);
    }
    Login(password: string, email: string) {
        return this.api.post<{ data: IUser | null }>("/login", {
          password,
          email,
        });
      }

    getUserData() {
        return this.api.get<{ data: IUserData[] }>("/view-users");
    }

    // deleteUser(userId: number): Promise<any> {
    //     return this.api.delete(`/delete-user?userId=${userId}`);
    // }
    editUser(data: IUser): Promise<any> {
        return this.api.post(`/update-user`, {
            ...data
        });
    }
    // getCollectionData(data: ICollection) {
    //     return this.api.get("/view-collections");
    // }
    // editCollection(data: ICollection, collectionId: number): Promise<any> {
    //     return this.api.patch(`/update-collection/${collectionId}`, {
    //         data,
    //     });
    // }

    // deleteCollection(collectionId: number): Promise<any> {
    //     return this.api.delete(`/delete-user/${collectionId}`);
    // }

    getClassData() {
        return this.api.get<{ data: IClassData[] }>("/view-class");
    }

    // deleteClass(classId: number): Promise<any> {
    //     return this.api.delete(`/delete-class?classId=${classId}`);
    // }

    editClass(data: IClass): Promise<any> {
        return this.api.post(`/update-class`, {
            ...data,
        });
    }
}

const adminApi = new AdminApi();
export default adminApi;
