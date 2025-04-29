export type UserState = {
    isLoggedIn: boolean;
    userName: string;
    userID: string;
    email: string;
}

export const guest: UserState = {
    isLoggedIn: false,
    userName: "guest",
    userID: "00000",
    email: "guest"
}