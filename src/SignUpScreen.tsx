import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

export const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [isEmailError, setIsEmailError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

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
			</Stack>
		</>
	);
};
