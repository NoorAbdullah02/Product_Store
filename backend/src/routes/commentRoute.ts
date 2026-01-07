import { Router } from "express";
import * as commentController from '../controllers/commentController';
import { checkValiditi } from "../middleware.ts/checkValidUser";

const router = Router();

router.post('/:productId', checkValiditi, commentController.CreateComment);

router.delete('/:commentId', checkValiditi, commentController.DeleteComment);

export default router; 