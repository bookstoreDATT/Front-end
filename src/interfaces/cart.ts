export interface ICartItem {
    productId: {
        thumbnail?: string;
        name?: string;
        _id: string;
        stock: number;
    };
    quantity: number;
}
export interface ICartData {
    productId: string;
    quantity: number;
}

export interface ICart {
    items: ICartItem[];
    open: boolean;
}

export interface ICartResponse {
    _id: string;
    userId: string;
    items: ICartItem[];
}
