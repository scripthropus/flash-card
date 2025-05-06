import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getFirestore,
	setDoc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export interface FlashCard {
	deckName: string;
	question: string;
	answer: string;
	incorrectAns: string[];
}

export const addFlashCard = async (
	userID: string | null,
	flashCardData: FlashCard,
) => {
	if (!userID) {
		console.error("ユーザーIDが指定されていません。");
		return;
	}
	if (!flashCardData.deckName) {
		console.error(
			"デッキ名 (deckName) がフラッシュカードデータに含まれていません。",
		);
		return;
	}

	const userDocRef = doc(db, "users", userID);

	const flashCardsCollectionRef = collection(
		db,
		"users",
		userID,
		flashCardData.deckName,
	);

	try {
		await setDoc(
			userDocRef,
			{
				existingFlashCards: arrayUnion(flashCardData.deckName),
			},
			{ merge: true },
		);

		await addDoc(flashCardsCollectionRef, flashCardData);
	} catch (error) {
		console.error(
			"フラッシュカードの追加またはユーザー情報の更新に失敗しました:",
			error,
		);
	}
};

export const fetchDeckName = async (userID: string) => {
	if (!userID) {
		console.warn("fetchDeckName が userID なしで呼び出されました。");
		return [];
	}

	const userDocRef = doc(db, "users", userID);

	try {
		const docSnap = await getDoc(userDocRef);
		if (!docSnap.exists()) {
			console.log("ドキュメントが見つかりません");
			return [];
		}

		const userData = docSnap.data();

		const deckNames = Array.isArray(userData.existingFlashCards)
			? userData.existingFlashCards
			: [];

		return deckNames;
	} catch (error) {
		console.error(`デッキ名取得中にエラーが発生しました: ${error}`);
		throw error;
	}
};
