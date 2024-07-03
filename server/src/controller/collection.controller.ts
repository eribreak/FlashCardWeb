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
import { Flashcard, Prisma } from "@prisma/client";
import collectionService from "../service/collection.service";

class CollectionController {
    /**
     *  * create a new collection
     */
    async createCollection(
        req: Request<
            any,
            any,
            {
                userId: string;
                name: string;
                summary?: string;
                description?: string;
                flashCards: [Flashcard];
                belongto?: number;
            }
        >,
        res: Response
    ) {
        try {
            const { userId, name, summary, description, flashCards, belongto } = req.body;
            if (!userId || !name) {
                throw new MissingParameter();
            }

            // * check if the user is exist or not
            const existUser = await prisma.user.findFirst({
                where: {
                    id: Number(userId),
                },
            });

            if (!existUser) {
                throw new BadRequest("user not found");
            }

            // * create a new colltion througth user
            const newCollection = await prisma.user.update({
                where: {
                    id: Number(existUser.id),
                },
                data: {
                    collections: {
                        create: {
                            name,
                            summary,
                            description,
                            belongto,
                            flashcards: {
                                createMany: {
                                    data:
                                        flashCards && flashCards.length > 0
                                            ? flashCards.map((flashcard,index) => { return {
                                                front_text: flashcard.front_text,
                                                back_text: flashcard.back_text
                                            }})
                                            : [],
                                },
                            },
                        },
                    },
                },
                include: {
                    collections: {
                        include: {
                            flashcards: true,
                            user: true,
                        },
                    },
                },
            });

            return res.status(200).json({ collection: newCollection });
        } catch (error: any) {
            console.log(error.stack);
            const err = new HttpErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json({ message: err.message });
        }
    }

    /**
     * * add new flashcard to collection
     */
    async addFlashCard(
        req: Request<
            any,
            any,
            {
                collectionId: string;
                userId: string;
                flashCards: [Flashcard];
            }
        >,
        res: Response
    ) {
        try {
            const { flashCards, collectionId, userId } = req.body;

            if (
                !flashCards ||
                !(flashCards.length > 0) ||
                !collectionId ||
                !userId
            ) {
                throw new MissingParameter();
            }

            const existCollection = await prisma.collection.update({
                where: {
                    id: Number(collectionId),
                    author: Number(userId),
                },
                data: {
                    flashcards: {
                        createMany: {
                            data: flashCards,
                        },
                    },
                },
            });

            return res.status(200).json(existCollection);
        } catch (error: any) {
            console.log(error.stack);
            const err = new HttpErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json({ message: err.message });
        }
    }

    /**
     *  *  update collection information
     */

    async updateCollection(
        req: Request<
            any,
            any,
            {
                collectionId: string;
                name: String;
                description: String;
                summary: String;
            }
        >,
        res: Response
    ) {
        try {
            const { name, description, summary, collectionId } = req.body;

            if (!name) {
                throw new MissingParameter("Collection need name");
            }

            const updatedCollection = await prisma.collection.update({
                where: { id: Number(collectionId) },
                data: {
                    name: String(name),
                    description: description ? String(description) : null,
                    summary: summary ? String(summary) : null,
                },
            });

            return res.status(200).json({ data: updatedCollection });
        } catch (error: any) {
            console.log(error);

            const err = new HttpErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json(err.message);
        }
    }

    /**
     *  * update flash card infomation
     */

    async updateFlashCard(
        req: Request<
            any,
            any,
            {
                collectionId: string;
                userId: string;
                flashCards: [Flashcard];
            }
        >,
        res: Response
    ) {
        try {
            const { collectionId, userId, flashCards } = req.body;

            if (
                !collectionId ||
                !userId ||
                !flashCards ||
                !(flashCards.length > 0)
            ) {
                throw new MissingParameter();
            }
            let collection;
            await Promise.all(
                flashCards.map(async (flashCard, index) => {
                    collection = await prisma.collection.update({
                        where: {
                            id: Number(collectionId),
                            author: Number(userId),
                        },
                        data: {
                            flashcards: {
                                update: {
                                    where: {
                                        id: Number(flashCard.id),
                                    },
                                    data: flashCard,
                                },
                            },
                        },
                        include: {
                            flashcards: true,
                            user: true,
                        },
                    });
                })
            );

            return res.status(200).json(collection);
        } catch (error: any) {
            console.log(error.stack);
            const err = new HttpErrorResponse(error.message, error.statusCode);

            return res.status(err.statusCode).json(err.message);
        }
    }

    async viewCollection(
        req: Request<
            any,
            any,
            any,
            { filter?: "all"; name?: string; ownerId?: string }
        >,
        res: Response
    ) {
        try {
            const { filter, name, ownerId } = req.query;

            let data;

            if (ownerId) {
                if (name) {
                    data = await prisma.collection.findMany({
                        where: {
                            author: Number(ownerId),
                            name: {
                                contains: String(name),
                            },
                        },
                        include: {
                            flashcards: true,
                            user: true,
                        },
                    });
                } else {
                    data = await prisma.collection.findMany({
                        where: {
                            author: Number(ownerId),
                        },
                        include: {
                            flashcards: true,
                            user: true,
                        },
                    });
                }
            } else {
                if (name) {
                    data = await prisma.collection.findMany({
                        where: {
                            name: {
                                contains: String(name),
                            },
                        },
                        include: {
                            flashcards: true,
                            user: true,
                        },
                    });
                } else {
                    data = await prisma.collection.findMany({
                        include: {
                            flashcards: true,
                            user: true,
                        },
                    });
                }
            }
            return res.status(200).json({ data: data });
        } catch (error: any) {
            console.log(error.stack);
            const err = new HttpErrorResponse(error.message, error.statusCode);

            return res.status(err.statusCode).json(err.message);
        }
    }
    async deleteCollection(
        req: Request<any, any, any, { collectionId: string }>,
        res: Response
    ) {
        try {
            const { collectionId } = req.query;
            console.log(collectionId)
            const deletedFlashCard = await prisma.flashcard.deleteMany({
                where: {collectionId: Number(collectionId)}
            })
            const deletedCollection = await prisma.collection.delete({
                where: { id: Number(collectionId) },
            });
            return res.status(200);
        } catch (error: any) {
            console.log(error.stack);
            const err = new HttpErrorResponse(error.message, error.statusCode);
            return res.status(err.statusCode).json({ message: err.message });
        }
    }
}

const collectionController = new CollectionController();
export default collectionController;
