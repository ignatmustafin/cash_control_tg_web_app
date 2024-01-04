import {Schema, model, Types} from "mongoose";

export interface Category {
    _id: Types.ObjectId;
    name: string;
}

const categorySchema = new Schema<Category>({
    name: {
        type: String,
        request: true,
        unique: true,
    }
});

export const CategoryModel = model('Category', categorySchema);

