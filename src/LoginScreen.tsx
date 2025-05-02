import { Button, Stack, TextField, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { z } from "zod";
import { userInfoContext } from "./App";
import { app } from "./firebase";
import type { UserInfo } from "./userInfo.ts";

const emailSchema = z.string().email();

interface LoginScreenProps {
	screenName: string;
	onLoginSuccess: (s: string) => void;
}

export const LoginScreen = ({
	screenName,
	onLoginSuccess,
}: LoginScreenProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEmailError, setIsEmailError] = useState(false);

	const userInfo = useContext(userInfoContext);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setEmail(newValue);

		// 入力値が空の場合はエラーにしない
		if (newValue === "") {
			setIsEmailError(false);
			return;
		}

		const emailParse = emailSchema.safeParse(newValue);

		if (emailParse.success) {
			setIsEmailError(false);
		} else {
			setIsEmailError(true);
		}
	};

	const handleSubmit = () => {
		const emailParse = emailSchema.safeParse(email);

		if (emailParse.success && password.length > 0) {
			const auth = getAuth(app);
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const info: UserInfo = {
						isLoggedIn: true,
						userName: "", //あとで取得するよう変更する
						userID: userCredential.user.uid,
						email: email,
					};

					userInfo.setUserInfo(info);
					onLoginSuccess(screenName);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(`${errorCode}: ${errorMessage}`);
				});
		}
	};

	return (
		<Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
			<Typography variant="h5">Login Screen</Typography>
			<TextField
				label="メールアドレス"
				variant="outlined"
				value={email}
				onChange={handleEmailChange}
				error={isEmailError}
				sx={{ width: "100%", maxWidth: 400 }}
			/>

			<TextField
				label="パスワード"
				variant="outlined"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				sx={{ width: "100%", maxWidth: 400 }}
			/>
			<Button onClick={handleSubmit}>送信</Button>
		</Stack>
	);
};
