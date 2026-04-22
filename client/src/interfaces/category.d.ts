import type { TransactionType } from "./transaction";
export interface Category {
    id: string;
    name: string;
    description: string;
    type: TransactionType;
}
