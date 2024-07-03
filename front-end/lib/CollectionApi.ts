import { Api } from "./api";

export interface IFlashCardRequest {
  id?: number;
  front_text: string;
  front_img?: string | null;
  back_text: string;
  back_img?: string | null;
}

interface ICollectionRequest {
  name: string;
  userId: number;
  description: string;
  summary?: String;
  flashCards?: IFlashCardRequest[];
  belongto?: number;
}

export interface ICollection {
  id: number;
  name: string;
  description?: string;
  summary?: number;
  user: {
    id: number;
    name: string;
    password: string;
    email: string;
    phoneNumber: string | null;
  } | null;
  flashcards: {
    id?: number;
    front_text: string;
    front_img: string | null;
    back_text: string;
    back_img: string | null;
    collectionId: number;
  }[];
}

class CollectionApi extends Api {
  constructor(route: string = "/collection") {
    super();
    this.connect(route);
  }

  createCollection(data: ICollectionRequest): Promise<any> {
    return this.api.post("/create-collection", {
      ...data,
    });
  }

  viewCollection(filter?: "all", name?: string, ownerId?: string) {
    const params = new URLSearchParams();

    if (filter !== undefined) {
      params.append("filter", filter);
    }
    if (name) {
      params.append("name", name);
    }
    if (ownerId) {
      params.append("ownerId", ownerId);
    }
    return this.api.get<{
      data: ICollection[];
    }>(`/view-collection?${params.toString()}`);
  }
  deleteConllection(collectionid: Number): Promise<any> {
    return this.api.delete(`/delete?collectionId=${collectionid}`);
  }

  editCollection(data: ICollectionRequest, collectionid: Number): Promise<any> {
    return this.api.patch(`/update-collection/${collectionid}`, {
      data,
    });
  }

  editFlashCard(data: {flashcard: IFlashCardRequest, collectionid: String, userId: String }): Promise<any> {
    return this.api.post(`/update-flash-card/`, {
      data,
    });
  }

  addFlashCard(data: IFlashCardRequest, collectionid: Number ): Promise<any> {
    return this.api.post(`/${collectionid}/add-flash-card/`, {
      data,
    });
  }
}

const collectionApi = new CollectionApi();

export default collectionApi;
