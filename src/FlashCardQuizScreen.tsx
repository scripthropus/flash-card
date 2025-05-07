import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useState } from "react";
import useSWR from "swr";
import { userInfoContext } from "./App";
import { FlashCardQuiz } from "./FlashCardQuiz";
import {
	type FlashCardAndID,
	fetchAllDecksWithFlashcards,
} from "./flashCardService";

export const FlashCardQuizScreen = () => {
	const [selectedDeckName, setSelectedDeckName] = useState("");
	const userInfo = useContext(userInfoContext);
	const {
		data: decks,
		error,
		isLoading,
	} = useSWR(
		userInfo.userInfo.isLoggedIn ? userInfo.userInfo.userID : null,
		fetchAllDecksWithFlashcards,
	);

	const deckNames: string[] = decks ? decks.map((deck) => deck.deckName) : [];

	if (isLoading) {
		return <Typography>Loading decks...</Typography>;
	}

	if (error) {
		return <Typography>Error loading decks: {error.message}</Typography>;
	}

	if (!decks || decks.length === 0) {
		return <Typography>No decks found.</Typography>;
	}

	const handleDeckChange = (event: SelectChangeEvent) => {
		setSelectedDeckName(event.target.value as string);
	};

	const selectedDeckData = decks.find(
		(deck) => deck.deckName === selectedDeckName,
	);
	const currentCard: FlashCardAndID | undefined =
		selectedDeckData && selectedDeckData.cards.length > 0
			? selectedDeckData.cards[0]
			: undefined;
	return (
		<>
			<Box sx={{ minWidth: 120 }}>
				<FormControl size={"medium"} sx={{ minWidth: 120 }}>
					<InputLabel id="deckSelectInput">deck</InputLabel>
					<Select
						labelId="deckSelector"
						id="deckSelector"
						value={selectedDeckName}
						label="deckName"
						onChange={handleDeckChange}
						displayEmpty
					>
						{deckNames.map((deck) => (
							<MenuItem key={deck} value={deck}>
								{deck}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			{selectedDeckName ? (
				currentCard ? (
					<FlashCardQuiz
						question={currentCard.question}
						answer={currentCard.answer}
						incorrectAns={currentCard.incorrectAns}
						key={currentCard.id}
					/>
				) : (
					<Typography>
						選択された"{selectedDeckName}"デッキにカードがありません。
					</Typography>
				)
			) : (
				<Typography>デッキを選択してください。</Typography>
			)}
		</>
	);
};
