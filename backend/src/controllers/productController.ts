import { Response, Request } from 'express';

import * as quiries from '../db/queries';
import { imagekit } from '../config/imagekit';


//get my products
export const getAllProducts = async (req: Request, res: Response) => {

    try {
        const products = await quiries.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Failed to fetch products" });
    }

}

// get single products
export const SingleProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await quiries.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);

    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Failed to fetch product" });
    }
}



// if required need to again check this ????

// Get my Products
export const getMyProducts = async (req: Request, res: Response) => {

    try {
        const userId = (req as any).user.id;
        const check = await quiries.getUserById(userId);
        if (!check) {
            return res.status(404).json({ message: "User not found" });
        }

        const products = await quiries.getProductsByUserId(userId);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching user's products:", error);
        return res.status(500).json({ message: "Failed to fetch user's products" });
    }
};


// this also create product route

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const user_id = (req as any).user?.id;


        const file = req.file as Express.Multer.File;

        // Upload image to ImageKit
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `${Date.now()}-${file.originalname}`,
            folder: "/products",
        });

        const product = await quiries.createProduct({
            title,
            description,
            imageUrl: uploadedImage.url,
            userId: user_id,
        });

        return res.status(201).json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({ message: "Failed to create product" });
    }
};


// Update Product
export const updateproduct = async (req: Request, res: Response) => {


    const { id } = req.params;
    try {
        const { title, description, imageUrl } = req.body;
        const existingProduct = await quiries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the logged-in user is the owner of the product
        const userId = (req as any).user?.id;
        if (existingProduct.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You can only update your own products" });
        }

        const updatedProduct = await quiries.updateProduct(id, {
            title,
            description,
            imageUrl
        });

        return res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({ message: "Failed to update product" });
    }

}

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const existingProduct = await quiries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the logged-in user is the owner of the product
        const userId = (req as any).user?.id;
        if (existingProduct.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own products" });
        }

        await quiries.deleteProduct(id);
        return res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Failed to delete product" });
    }

}





