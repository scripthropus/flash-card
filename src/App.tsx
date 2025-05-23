import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { green, grey } from "@mui/material/colors";
import { createContext, useState } from "react";
import { AddFlashCardScreen } from "./AddFlashCardScreen";
import { FlashCardMenu } from "./FlashCardMenu";
import { FlashCardQuizScreen } from "./FlashCardQuizScreen";
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

function App() {
	const [currentScreen, setCurrentScreen] = useState<string>("home");
	const [userInfo, setUserInfo] = useState(guest);

	const handleScreenChange = (screenName: string) => {
		setCurrentScreen(screenName);
	};

	const renderScreen = () => {
		switch (currentScreen) {
			case SCREEN.ADD_FLASH_CARD:
				return <AddFlashCardScreen />;
			case SCREEN.FLASH_CARD:
				return <FlashCardQuizScreen />;
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
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="transparent">
					<Toolbar>
						<FlashCardMenu onNavigate={handleScreenChange} />
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Flash Card
						</Typography>
						<Avatar
							sx={{ bgcolor: userInfo.isLoggedIn ? green[300] : grey[500] }}
							variant="rounded"
						/>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ display: "flex" }}>
				<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
					{renderScreen()}
				</Box>
			</Box>
		</userInfoContext.Provider>
	);
}

export default App;
