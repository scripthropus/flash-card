import { Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

interface FlashCardProps {
	question: string;
	answer: string;
	incorrectAns: string[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const FlashCardQuiz = ({
	question,
	answer,
	incorrectAns,
}: FlashCardProps) => {
	const choicesWithId = useMemo(() => {
		const shuffledAnswers = shuffleArray(incorrectAns);
		const rand = Math.floor(Math.random() * 4);
		const finalChoices = shuffledAnswers.toSpliced(rand, 0, answer);
		return finalChoices.map((choiceValue) => ({
			id: crypto.randomUUID(),
			value: choiceValue,
		}));
	}, [answer, incorrectAns]);
	return (
		<>
			<Typography variant="h5">{question}</Typography>
			<Stack direction="column" spacing={{ sm: 2 }}>
				{choicesWithId.map((choice) => (
					<Button key={choice.id} sx={{ width: "100%", maxWidth: 400 }}>
						{choice.value}
					</Button>
				))}
			</Stack>
		</>
	);
};
