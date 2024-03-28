export interface ItemInterface {
    _id?: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export interface TransactionInterface {
    _id?: string;
    itemId: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    revenue: number;
    createdAt: string;
}

export interface ItemStoreInterface {
    items: ItemInterface[];
    item: ItemInterface;
    threshold: number;
    itemsThreshold: ItemInterface[];
    transactions: TransactionInterface[]
}

export interface GetItemsResponse {
    status: string;
    data: ItemInterface[]
}

export interface GetTransactionsResponse {
    status: string;
    data: TransactionInterface[]
}

export interface GetTransactionResponse {
    status: string;
    data: TransactionInterface
}

export interface GetItemResponse {
    status: string;
    data: ItemInterface
}

export interface GetThresholdItemResponse {
    status: string;
    data: { 
        _id: string;
        value: number;
    }
}
