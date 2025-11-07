import mongoose, { Schema, Document } from 'mongoose';
export interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
}
const ExpenseSchema: Schema = new Schema({
  description: {
    type: String,
    required: true 
  },
  amount: {
    type: Number,
    required: true 
  },
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);