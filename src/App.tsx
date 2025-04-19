import Box from "@mui/material/Box";
import { useState } from "react";
import { AddFlashCardScreen } from "./AddFlashCardScreen";
import { FlashCard } from "./FlashCard";
import { FlashCardMenu } from "./FlashCardMenu";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";

const testData = {
	question: "question",
	anser: "ANS",
	incorrectAns: ["a", "b", "c"],
};

function App() {
	const [currentScreen, setCurrentScreen] = useState<string>("home");

	const handleScreenChange = (screenName: string) => {
		setCurrentScreen(screenName);
	};

	const renderScreen = () => {
		switch (currentScreen) {
			case "add flash card":
				return <AddFlashCardScreen />;
			case "flash card":
				return (
					<FlashCard
						question={testData.question}
						anser={testData.anser}
						incorrectAns={testData.incorrectAns}
					/>
				);
			case "login":
				return <LoginScreen />;
			case "sign up":
				return <SignUpScreen />;
			case "home":
				return <HomeScreen />;
			default:
				return <HomeScreen />;
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<FlashCardMenu onNavigate={handleScreenChange} />
			<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
				{renderScreen()}
			</Box>
		</Box>
	);
}

export default App;
