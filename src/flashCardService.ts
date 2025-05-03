import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useContext } from "react";
import { userInfoContext } from "./App";
import { app } from "./firebase";

const db = getFirestore(app);

export interface FlashCard {
	deckName: string;
	question: string;
	answer: string;
	incorrectAns: string[];
}

export const addFlashCard = async (userID: string, flashCards: FlashCard) => {
	if (!userID) {
		return;
	}
	try {
		const flashCardsCollectionRef = await collection(
			db,
			"users",
			userID,
			flashCards.deckName,
		);
		await addDoc(flashCardsCollectionRef, flashCards);
	} catch (error) {
		console.error("追加に失敗しました");
	}
};
