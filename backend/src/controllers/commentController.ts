
import type { Request, Response } from 'express';

import * as queries from '../db/queries'

export const CreateComment = async (req: Request, res: Response) => {
    try {

        const { content } = req.body;

        const product_id =  req.params?.productId;

        const user_id =  (req as any).user?.id;

        if (!content) {
            return res.status(400).json({ message: "Content is required" })
        }

        console.log("Product ID:", product_id);
        console.log("User ID:", user_id);
        if(!product_id){
            return res.status(400).json({ message: "Product ID is required" })
        }
        if(!user_id){
            return res.status(400).json({ message: "User ID is required" })
        }

        const newComment = await queries.createComment({
            content,
            userId: user_id,
            productId: product_id
        });

        res.status(201).json(newComment);

    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

export const DeleteComment = async (req: Request, res: Response) => {
    try {
        const commentId  = req.params.commentId;


        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required" });
        }
        console.log("Comment ID to delete:", commentId);

        const deletedComment = await queries.deleteComment(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found or you are not authorized to delete it" });
        }

        res.status(200).json({ message: "Comment deleted successfully", deletedComment });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};







