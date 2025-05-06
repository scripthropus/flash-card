import {
	QuerySnapshot,
	addDoc,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
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
			"flashCards",
		);
		await addDoc(flashCardsCollectionRef, flashCards);
	} catch (error) {
		console.error("追加に失敗しました");
		console.error(error);
	}
};

export const fetchFlashCards = async (userID: string) => {
	if (!userID) {
		return;
	}

	const flashCardsCollectionRef = collection(db, "users", userID, "flashCards");

	try {
		const querySnapshot = await getDocs(flashCardsCollectionRef);

		const flashCards = querySnapshot.docs.map((doc) => ({
			...doc.data(),
		})) as FlashCard[];

		return flashCards;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
