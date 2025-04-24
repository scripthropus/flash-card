import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export interface FlashCard {
	deckName: string;
	question: string;
	answer: string;
	incorrectAns: string[];
}

export const addFlashCard = async (flashCards: FlashCard) => {
	//await setDoc(doc, (db, ))
};
