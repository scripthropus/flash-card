import Box from "@mui/material/Box";
import { createContext, useState } from "react";
import { AddFlashCardScreen } from "./AddFlashCardScreen";
import { FlashCardMenu } from "./FlashCardMenu";
import { FlashCardQuiz } from "./FlashCardQuiz";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";
import { type UserInfo, guest } from "./userInfo";

interface UserInfoContextType {
	userInfo: UserInfo;
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const userInfoContext = createContext<UserInfoContextType>({
	userInfo: guest,
	setUserInfo: () => {},
});

const testData = {
	question: "question",
	answer: "ANS",
	incorrectAns: ["a", "b", "c"],
};

function App() {
	const [currentScreen, setCurrentScreen] = useState<string>("home");
	const [userInfo, setUserInfo] = useState(guest);

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
		<userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<Box sx={{ display: "flex" }}>
				<FlashCardMenu onNavigate={handleScreenChange} />
				<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
					{renderScreen()}
				</Box>
			</Box>
		</userInfoContext.Provider>
	);
}

export default App;
