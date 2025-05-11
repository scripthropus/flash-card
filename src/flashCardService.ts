import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
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

export interface FlashCardAndID extends FlashCard {
	id: string;
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

export const fetchDeckName = async (userID: string): Promise<string[]> => {
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

export interface DeckWithFlashcards {
	deckName: string;
	cards: FlashCardAndID[];
}

export const fetchAllDecksWithFlashcards = async (
	userID: string,
): Promise<DeckWithFlashcards[]> => {
	if (!userID) {
		console.warn("fetchAllDecksWithFlashcards: userID is required.");
		return [];
	}

	let deckNames: string[];
	try {
		deckNames = await fetchDeckName(userID);
	} catch (error) {
		console.error(
			"fetchAllDecksWithFlashcards: fetchDeckNameでのエラー",
			error,
		);
		throw error;
	}

	if (deckNames.length === 0) {
		return [];
	}

	const fetchPromises = deckNames.map(async (deckName) => {
		if (typeof deckName !== "string" || deckName.trim() === "") {
			return null;
		}

		try {
			const flashCardsCollectionRef = collection(db, "users", userID, deckName);
			const querySnapshot = await getDocs(flashCardsCollectionRef);
			const flashcards: FlashCardAndID[] = [];

			for (const docSnap of querySnapshot.docs) {
				flashcards.push({
					id: docSnap.id,
					...docSnap.data(),
				} as FlashCardAndID);
			}
			return { deckName, cards: flashcards };
		} catch (error) {
			console.error(error);
			return null;
		}
	});

	try {
		const results = await Promise.all(fetchPromises);
		return results.filter((deck) => deck !== null) as DeckWithFlashcards[];
	} catch (error) {
		console.error(error);
		throw error;
	}
};
