import { AppBar, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import { deepOrange, green } from "@mui/material/colors";
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

export const SCREEN = {
	HOME: "home",
	LOGIN: "login",
	SIGN_UP: "signUp",
	ADD_FLASH_CARD: "addFlashCard",
	FLASH_CARD: "flashCard",
} as const;

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

	//test
	const test = () => {
		console.log(userInfo);
	};

	const renderScreen = () => {
		switch (currentScreen) {
			case SCREEN.ADD_FLASH_CARD:
				return <AddFlashCardScreen />;
			case SCREEN.FLASH_CARD:
				return (
					<FlashCardQuiz
						question={testData.question}
						answer={testData.answer}
						incorrectAns={testData.incorrectAns}
					/>
				);
			case SCREEN.LOGIN:
				return (
					<LoginScreen
						screenName={SCREEN.HOME}
						onLoginSuccess={handleScreenChange}
					/>
				);
			case SCREEN.SIGN_UP:
				return (
					<SignUpScreen
						screenName={SCREEN.HOME}
						onAuthSuccess={handleScreenChange}
					/>
				);
			case SCREEN.HOME:
				return <HomeScreen />;
			default:
				return <HomeScreen />;
		}
	};

	return (
		<userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<AppBar position="static">
				<Avatar
					onClick={test}
					sx={{ bgcolor: userInfo.isLoggedIn ? green[500] : deepOrange[500] }}
					variant="rounded"
				/>
				<FlashCardMenu onNavigate={handleScreenChange} />
			</AppBar>
			<Box sx={{ display: "flex" }}>
				<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
					{renderScreen()}
				</Box>
			</Box>
		</userInfoContext.Provider>
	);
}

export default App;
