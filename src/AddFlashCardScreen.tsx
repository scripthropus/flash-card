import { Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const AddFlashCardScreen = () => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);

	const handleIncorrectAnswerChange = (index: number, value: string) => {
		const newIncorrectAnswers = [...incorrectAnswers];
		newIncorrectAnswers[index] = value;
		setIncorrectAnswers(newIncorrectAnswers);
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h5" gutterBottom>
				Add Flash Card Screen
			</Typography>
			<Stack direction="row" spacing={4}>
				<Stack direction="column" spacing={2}>
					<TextField
						label="カードの内容"
						variant="outlined"
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						fullWidth // 横幅いっぱいに広げる
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
			</Stack>
		</Box>
	);
};
