import { db } from '../db/index.js';
import { eq } from 'drizzle-orm';
import {
    users,
    comments,
    products,
    type NewUser,
    type NewComment,
    type NewProduct
} from "./schema.js"



//user queri

export const createUser = async (data: NewUser) => {
    const [user] = await db.insert(users)
        .values(data).returning();
    return user;
}


export const getUserById = async (id: string) => {
    return db.query.users.findFirst({
        where: (eq(users.id, id))
    })
}


export const updateUser = async (id: string, data: Partial<NewUser>) => {
    const existingUser = await getUserById(id);
    if (!existingUser) {
        throw new Error(`user with this ${id} not found`)
    }

    const [user] = await db.update(users).set(data)
        .where(eq(users.id, id))
        .returning();
    return user;
}


// upsert=> either create or update
export const upsertUser = async (data: NewUser) => {

    // previous code

    // const existingUser = await getUserById(data.id);
    // if (existingUser) return updateUser(data.id, data);

    // Finalized the code 

    const [user] = await db
        .insert(users)
        .values(data)
        .onConflictDoUpdate({
            target: users.id,
            set: data
        }).returning();
    return user;

}



// product Query

export const createProduct = async (data: NewProduct) => {
    const [product] = await db
        .insert(products)
        .values(data)
        .returning();
    return product;
}


export const getAllProducts = async () => {
    db.query.products.findMany({
        with: { user: true },
        orderBy: (products, { desc }) => [
            desc(products.createdAt)
        ] // that means i see the latest product
    })
}

export const getProductById = async (id: string) => {
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: {
                orderBy: (comments, { desc }) => [desc(comments.createdAt)]
            }
        }
    })
}


export const getProductsByUserId = async (userId: string) => {
    return db.query.products.findMany({
        where: eq(products.userId, userId),
        with: { user: true },
        orderBy: (products,
            { desc }) => [desc(products.createdAt)]
    })
}

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
    const existingProduct = await
        getProductById(id);
    if (!existingProduct) {
        throw new Error(`product not exixts with this ${id}`)
    }

    const [product] = await db.update(products).set(data)
        .where(eq(products.id, id))
        .returning();
    return product;
}


export const deleteProduct = async (id: string) => {

    const existingProduct = await
        getProductById(id);
    if (!existingProduct) {
        throw new Error(`product not exixts with this ${id}`)
    }
    const [product] = await db.delete(products)
        .where(eq(products.id, id))
        .returning();
    return product;
}

// Comment Queryes

export const createComment = async (data: NewComment) => {
    const [comment] = await db.insert(comments)
        .values(data)
        .returning();
    return comment;
}

export const deleteComment = async (id: string) => {

    const existingComment = await
        getCommentById(id);
    if (!existingComment) {
        throw new Error(`Comment not exixts with this ${id}`)
    }

    const [comment] = await db.delete(comments)
        .where(eq(comments.id, id))
        .returning();
    return comment;
}


export const getCommentById = async (id: string) => {
    return db.query.comments
        .findFirst({
            where: eq(comments.id, id),
            with: { user: true }
        })
}

