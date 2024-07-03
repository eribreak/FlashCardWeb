import { Flashcard } from "@prisma/client";
import { prisma } from "../database/postgresql/connect.postgresql";
import { BadRequest } from "../lib/http.reponse";

class CollectionService {
  async addNewflashcard(
    userId: string,
    collectionId: string,
    flashCards: Flashcard[]
  ) {
    try {
      const addFlashCard = await prisma.collection.update({
        where: {
          id: Number(collectionId),
          author: Number(userId),
        },
        data: {
          flashcards: {
            createMany: { data: flashCards },
          },
        },
      });

      return addFlashCard;
    } catch (error) {
      console.log(error);

      throw new BadRequest();
    }
  }
}

const collectionService = new CollectionService();
export default collectionService;
