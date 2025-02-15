export interface ICartItem {
    productId: {
        thumbnail?: string;
        name?: string;
        _id: string;
        stock: number;
        price: number;
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
    quantityInCart: number;
}

export interface ICartResponse {
    _id: string;
    userId: string;
    items: ICartItem[];
}
