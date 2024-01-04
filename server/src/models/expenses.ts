import mongoose, {Schema, model, Model, Types, Document} from "mongoose";
import {Category, CategoryModel} from "./categories";

export interface IExpenses {
    _id: Types.ObjectId;
    date: Date;
    category: Category;
    amount: number;
}

const expensesSchema = new Schema<IExpenses>({
    date: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
});

// 3. Create a Model.
const Expenses = model<IExpenses>('User', expensesSchema);


export {Expenses}
