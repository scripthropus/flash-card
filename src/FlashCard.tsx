import { Typography } from "@mui/material";

interface FlashCardProps {
	question: string;
	anser: string;
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
	anser,
	incorrectAns,
}: FlashCardProps) => {
	const shuffled = shuffleArray(incorrectAns);
	const rand = Math.floor(Math.random() * 4);
	const choices = shuffled.toSpliced(rand, 0, anser);
	return (
		<>
			<Typography variant="h5">{question}</Typography>
			{choices.map((val) => (
				<Typography>{val}</Typography>
			))}
		</>
	);
};
