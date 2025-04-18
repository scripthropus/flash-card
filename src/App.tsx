import Box from "@mui/material/Box";
import { useState } from "react";
import { AddFlashCardScreen } from "./AddFlashCardScreen";
import { FlashCardMenue } from "./FlashCardMene";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";

function App() {
	const [currentScreen, setCurrentScreen] = useState<string>("home");

	const handleScreenChange = (screenName: string) => {
		setCurrentScreen(screenName);
	};

	const renderScreen = () => {
		switch (currentScreen) {
			case "add flash card":
				return <AddFlashCardScreen />;
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
			<FlashCardMenue onNavigate={handleScreenChange} />
			<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
				{renderScreen()}
			</Box>
		</Box>
	);
}

export default App;
