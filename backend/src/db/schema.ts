import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at",
        { mode: "date" })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});


export const products = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at",
        { mode: "date" })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
})


export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    content: text("content").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).notNull(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at",
        { mode: "date" })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});

//user relations
 
export const userRelations = relations(users, ({ many }) => ({
    products: many(products),
    comments: many(comments),
}));

//product relations

export const productRelations = relations(products, ({ one, many }) => ({

    comments: many(comments),
    user: one(users, {
        fields: [products.userId],
        references: [users.id],
    })
}));


//comment relations

export const commentRelatins = relations(products, ({ one, many }) => ({

    comments: many(comments),
    user: one(users, {
        fields: [products.userId],
        references: [users.id],
    })
}));




export type user = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

