export type TransactionType = "Income" | "Expense";

export interface CreateTransactionRequest {
    amount: number;
    description: string;
    date: string;
    type: TransactionType;
    category: string;
    file?:Express.Multer.File;
}