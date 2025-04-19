import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEmailError, setIsEmailError] = useState(false);

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
		</Stack>
	);
};
