export enum OrderStatus {
    pending = 'pending',
    cancelled = 'cancelled',
    confirmed = 'confirmed',
    shipping = 'shipping',
    delivered = 'delivered',
    done = 'done',
}

export enum PaymentMethod {
    cash = 'cash',
    card = 'card',
}

export enum AttributeType {
    Manual = 'manual',
    Options = 'options',
    Multiple = 'multiple',
}

export const ORDER_STATUS_ARR = Object.values(OrderStatus);
export enum DataTypeConvert {
    raw = 'raw',
    obj = 'obj',
}

export enum LOCATION_TYPES {
    SHIPPING_ADDRESS = 'shipping_address',
    DEFAULT = 'default',
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}
