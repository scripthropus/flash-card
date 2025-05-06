import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import useSWR from "swr";
import { userInfoContext } from "./App";
import { fetchDeckName } from "./flashCardService";

interface UserDecksNameProps {
	userId: string | null;
}
const UserDecksName = ({ userId }: UserDecksNameProps) => {
	const userInfo = useContext(userInfoContext);
	const {
		data: decksName,
		error,
		isLoading,
	} = useSWR(userId ? userId : null, fetchDeckName);

	//ログインしていない
	if (!userInfo.userInfo.isLoggedIn) {
		return;
	}

	if (error && userInfo.userInfo.isLoggedIn) {
		console.error("SWR fetch error:", error);
		return <div>フラッシュカードの読み込みに失敗しました。</div>;
	}

	if (isLoading) {
		return <div>読み込み中...</div>;
	}

	//ログインしているがカードがない
	if (!decksName || (decksName.length === 0 && userInfo.userInfo.isLoggedIn)) {
		return <div>利用可能なフラッシュカードはありません。</div>;
	}

	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{decksName.map((deck) => (
				<Grid key={deck} size={{ xs: 2, sm: 4, md: 4 }} className="text-center">
					{deck}
				</Grid>
			))}
		</Grid>
	);
};

export const HomeScreen = () => {
	const userInfo = useContext(userInfoContext);
	return (
		<Box>
			<UserDecksName userId={userInfo.userInfo.userID} />
		</Box>
	);
};
