import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { userInfoContext } from "./App";
import { type FlashCard, addFlashCard } from "./flashCardService";

export const AddFlashCardScreen = () => {
	const [deckName, setDeckName] = useState("");
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);

	const userInfo = useContext(userInfoContext);

	const handleIncorrectAnswerChange = (index: number, value: string) => {
		const newIncorrectAnswers = [...incorrectAnswers];
		newIncorrectAnswers[index] = value;
		setIncorrectAnswers(newIncorrectAnswers);
	};

	const handleAddFlashCard = async () => {
		if (deckName && question && answer && incorrectAnswers.every(Boolean)) {
			console.log("追加");
			const flashCard: FlashCard = {
				deckName: deckName,
				question: question,
				answer: answer,
				incorrectAns: incorrectAnswers,
			};
			await addFlashCard(userInfo.userInfo.userID, flashCard);
		} else {
			alert("すべての項目を入力してください");
		}
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h5" gutterBottom>
				Add Flash Card Screen
			</Typography>
			<Stack direction="row" spacing={4}>
				<Stack direction="column" spacing={2}>
					<TextField
						label="追加するデッキ名"
						variant="outlined"
						onChange={(e) => setDeckName(e.target.value)}
					/>
					<TextField
						label="カードの内容"
						variant="outlined"
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						fullWidth
					/>
					<TextField
						label="カードの答え"
						variant="outlined"
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
						fullWidth
					/>
				</Stack>
				<Stack direction="column" spacing={2}>
					<TextField
						label="偽の選択肢1"
						variant="outlined"
						value={incorrectAnswers[0]}
						onChange={(e) => handleIncorrectAnswerChange(0, e.target.value)}
						fullWidth
					/>
					<TextField
						label="偽の選択肢2"
						variant="outlined"
						value={incorrectAnswers[1]}
						onChange={(e) => handleIncorrectAnswerChange(1, e.target.value)}
						fullWidth
					/>
					<TextField
						label="偽の選択肢3"
						variant="outlined"
						value={incorrectAnswers[2]}
						onChange={(e) => handleIncorrectAnswerChange(2, e.target.value)}
						fullWidth
					/>
				</Stack>
				<Button onClick={handleAddFlashCard}>追加</Button>
			</Stack>
		</Box>
	);
};
