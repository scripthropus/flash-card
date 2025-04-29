import Box from "@mui/material/Box";
import { useState, createContext } from "react";
import { AddFlashCardScreen } from "./AddFlashCardScreen";
import { FlashCardMenu } from "./FlashCardMenu";
import { FlashCardQuiz } from "./FlashCardQuiz";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";
import { UserState, guest } from "./Auth";

export const testStateContext = createContext<[UserState, React.Dispatch<React.SetStateAction<UserState>>]>([
    guest, // UserState の初期値
    () => {} // 更新関数の初期値（空の関数）
]);

const testData = {
	question: "question",
	answer: "ANS",
	incorrectAns: ["a", "b", "c"],
};

function App() {
	const [currentScreen, setCurrentScreen] = useState<string>("home");
	const [test, setTest] = useState(guest);

	const handleScreenChange = (screenName: string) => {
		setCurrentScreen(screenName);
	};

	const renderScreen = () => {
		switch (currentScreen) {
			case "add flash card":
				return <AddFlashCardScreen />;
			case "flash card":
				return (
					<FlashCardQuiz
						question={testData.question}
						answer={testData.answer}
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
		<testStateContext.Provider value={[test, setTest]}>
		<Box sx={{ display: "flex" }}>
			<FlashCardMenu onNavigate={handleScreenChange} />
			<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
				{renderScreen()}
			</Box>
		</Box>
		</testStateContext.Provider>
	);
}

export default App;
