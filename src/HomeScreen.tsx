import { Typography } from "@mui/material";
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
		<div>
			<ul>
				{decksName.map((deck) => (
					<li key={deck}>{deck}</li>
				))}
			</ul>
		</div>
	);
};

export const HomeScreen = () => {
	const userInfo = useContext(userInfoContext);
	return (
		<Typography variant="h5" className="font-bold text-5xl">
			後でここにフラッシュカードのリストを表示する予定 (Home Screen)
			<UserDecksName userId={userInfo.userInfo.userID} />
		</Typography>
	);
};
