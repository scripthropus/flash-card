import { TextField, Typography } from "@mui/material";
import { useState } from "react";

export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<>
			<Typography variant="h5">Login Screen</Typography>
			<TextField
				label="メールアドレス"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				label="パスワード"
				variant="outlined"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
		</>
	);
};
