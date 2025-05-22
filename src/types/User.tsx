export interface User {
    username: string;
    email: string;
    password: string;
    birthDate: string; // "2023-01-01"
}
export interface UserLogin {
    username: string;
    password: string;
}