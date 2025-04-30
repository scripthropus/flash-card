import { Button, Stack, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { z } from "zod";
import { userInfoContext } from "./App.tsx";
import { app } from "./firebase.ts";
import type { UserInfo } from "./userInfo.ts";

const emailSchema = z.string().email();

export const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [isEmailError, setIsEmailError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	//test
	const testUser = useContext(userInfoContext);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setEmail(newValue);

		// 入力値が空の場合はエラーにしない
		if (newValue === "") {
			setIsEmailError(false);
			return;
		}

		const result = emailSchema.safeParse(newValue);

		if (result.success) {
			setIsEmailError(false);
		} else {
			setIsEmailError(true);
		}
	};

	const handleSubmit = () => {
		const changed: UserInfo = {
			isLoggedIn: true,
			userName: "changed",
			userID: "changed",
			email: "changed",
		};
		const result = emailSchema.safeParse(email);
		if (result.success) {
			const auth = getAuth(app);

			testUser.setUserInfo(changed);
			console.log(testUser.userInfo);

			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					alert(`追加されました ${user} さん`);
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					alert("追加に失敗しました");
					console.log(`${errorCode} : ${errorMessage}`);
					// ..
				});
		}
	};

	return (
		<>
			<Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
				<Typography variant="h5">Sign Up Screen</Typography>
				<TextField
					label="ユーザーネーム"
					variant="outlined"
					value={userName}
					sx={{ width: "100%", maxWidth: 400 }}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
					<TextField
						label="メールアドレス"
						variant="outlined"
						value={email}
						onChange={handleEmailChange}
						error={isEmailError}
					/>
					<TextField
						label="パスワード"
						variant="outlined"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Stack>
				<Button onClick={handleSubmit}>送信</Button>
			</Stack>
		</>
	);
};
