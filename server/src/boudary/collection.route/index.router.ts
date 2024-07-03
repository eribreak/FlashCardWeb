import { Router } from "express";
import authController from "../../controller/auth.controller";
import collectionController from "../../controller/collection.controller";

const collectionRouter = Router();

/**
 * create a new collection
 */
collectionRouter.post("/create-collection",collectionController.createCollection);

/**
 * update collection infomations
 */
collectionRouter.patch(
  "/update-collection",
  collectionController.updateCollection
);

/**
 * * create new flash card
 *
 */
collectionRouter.post("/add-flash-card", collectionController.addFlashCard);

/**
 * update flash card information
 */
collectionRouter.patch(
  "/update-flash-card",
  collectionController.updateFlashCard
);

collectionRouter.get("/view-collection", collectionController.viewCollection);
collectionRouter.delete("/delete",collectionController.deleteCollection)
// collectionRouter.post('/forgot-password', authController.sign_up);

export default collectionRouter;
