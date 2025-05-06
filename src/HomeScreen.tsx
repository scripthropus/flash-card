import { Typography } from "@mui/material";
import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { userInfoContext } from "./App";
import { fetchDeckName } from "./flashCardService";
import { type UserInfo, guest } from "./userInfo";

interface UserFlashCardsProps {
	userId: string;
}
const UserFlashCards = ({ userId }: UserFlashCardsProps) => {
	const userInfo = useContext(userInfoContext);
	const {
		data: decksName,
		error,
		isLoading,
	} = useSWR(userId ? userId : null, fetchDeckName);

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

	//ログインしていない
	if (!userInfo.userInfo.isLoggedIn) {
		return;
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
			<UserFlashCards userId={userInfo.userInfo.userID} />
		</Typography>
	);
};
