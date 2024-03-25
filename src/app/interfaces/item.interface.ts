export interface ItemInterface {
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export interface ItemStoreInterface {
    items: ItemInterface[];
    item: ItemInterface
}
