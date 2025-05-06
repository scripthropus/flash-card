export type UserInfo = {
	isLoggedIn: boolean;
	userName: string | null;
	userID: string | null;
	email: string | null;
};

export const guest: UserInfo = {
	isLoggedIn: false,
	userName: null,
	userID: null,
	email: null,
};
