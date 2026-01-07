import { db } from '../db/index';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import {
    users,
    comments,
    products,
    type NewUser,
    type NewComment,
    type NewProduct
} from "./schema"



//user queri

export const createUser = async (data: NewUser) => {

    const existingUser = await db.query.users.findFirst({
        where: (eq(users.email, data.email))
    });
    if (existingUser) throw new Error("Email already in use");
    try {
        const [user] = await db.insert(users)
            .values({ ...data, id: randomUUID() }).returning();
        return user;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to register user! ${error instanceof Error ? error.message : ''}`);
    };
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
    try {
        const [product] = await db
            .insert(products)
            .values({ ...data, id: randomUUID() })
            .returning();
        return product;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to create product! ${error instanceof Error ? error.message : ''}`);
    }
}


export const getAllProducts = async () => {
    try {
        const product = await db.query.products.findMany({
            with: { user: true },
            orderBy: (products, { desc }) => [
                desc(products.createdAt)
            ] // that means i see the latest product

        })
        return product;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to fetch products! ${error instanceof Error ? error.message : ''}`);
    }
}

export const getUserByEmail = async (email: string) => {
    return db.query.users.findFirst({
        where: eq(users.email, email)
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
        .values({ ...data, id: randomUUID() })
        .returning();
    return comment;
}

export const deleteComment = async (id: string) => {
    // console.log("Deleting comment with ID:", id);


    const existingComment = await getCommentById(id);

    if (!existingComment) {
        throw new Error(`Comment not exixts with this ${id}`)
    }

    //  console.log("Deleting comment with ID:", id);

    const [comment] = await db.delete(comments)
        .where(eq(comments.id, id))
        .returning();

    return comment;
}


export const getCommentById = async (id: string) => {
    const comment = await db.query.comments.findFirst({
        where: eq(comments.id, id),
        with: { user: true },
    });
    if (!comment) {
        throw new Error(`Comment not found with id: ${id}`);
    }
    return comment;
};


