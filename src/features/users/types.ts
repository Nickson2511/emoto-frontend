export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin' | 'superadmin';
}


export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
}
