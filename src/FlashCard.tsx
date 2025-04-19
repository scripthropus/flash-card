import { Button, Stack, Typography } from "@mui/material";

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

export const FlashCard = ({
	question,
	answer,
	incorrectAns,
}: FlashCardProps) => {
	const shuffled = shuffleArray(incorrectAns);
	const rand = Math.floor(Math.random() * 4);
	const choices = shuffled.toSpliced(rand, 0, answer);
	return (
		<>
			<Typography variant="h5">{question}</Typography>
			<Stack direction="column" spacing={{ sm: 2 }}>
				{choices.map((val) => (
					<Button key={val} sx={{ width: "100%", maxWidth: 400 }}>
						{val}
					</Button>
				))}
			</Stack>
		</>
	);
};
