import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
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
						onChange={(e) => setEmail(e.target.value)}
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
