export type UserInfo = {
	isLoggedIn: boolean;
	userName: string;
	userID: string;
	email: string;
};

export const guest: UserInfo = {
	isLoggedIn: false,
	userName: "guest",
	userID: "00000",
	email: "guest",
};
