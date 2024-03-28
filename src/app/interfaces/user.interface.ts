export interface User {
    "_id": string;
    "name": string;
    "profileImage": string;
    "username": string;
    "email": string;
    "role": string;
    "gender": string;
    "birthDate": string;
}

export interface ResponseGetUsers<T> {
    status: string;
    data: T
}

export interface UserStore {
    users: User[];
    user: User
}
