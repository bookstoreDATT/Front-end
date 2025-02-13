export interface IRegisterPayload {
    userName: string;
    email: string;
    password: string;
}
export interface ILoginPayload {
    email: string;
    password: string;
}
export interface IUser {
    _id: string;
    userName: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
    accessToken?: string;
}
export interface IRegisterResponse {
    userName: string;
    email: string;
    avatar: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPayloadResetPassword {
    newPassword: string;
    oldPassword: string;
}
