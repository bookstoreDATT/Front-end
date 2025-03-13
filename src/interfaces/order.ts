export type CustomerInfo = {
    name: string;
    email: string;
    phone: string;
};

export type OrderItem = {
    productId: string;
    quantity: number;
    image: string;
    price: number;
    name: string;
    isReviewed: boolean;
    isReviewDisabled: boolean;
};

export interface IOrderCreatePayload {
    items: OrderItem[];
    customerInfo: CustomerInfo;
    shippingAddress: string;
    totalPrice: number;
    description?: string;
    paymentMethod: string;
}

export interface IOrder {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    shippingFee: number;
    customerInfo: CustomerInfo;
    shippingAddress: string;
    paymentMethod: string;
    isPaid: boolean;
    canceledBy: string;
    description: string;
    orderStatus: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderResponse extends IOrderCreatePayload {}

export interface ICreatePayosOrderPayload extends IOrderCreatePayload {
    cancelUrl: string;
    returnUrl: string;
    amount: number;
}

export interface IPayosOderResponse extends IOrderCreatePayload {
    checkoutUrl: string;
    paymentMethod: string;
}
