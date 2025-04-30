import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { SCREEN } from "./App";

interface FlashCardMenuProps {
	onNavigate: (screenName: string) => void;
}

export const FlashCardMenu = ({ onNavigate }: FlashCardMenuProps) => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const handleListItemClick = (screenName: string) => {
		onNavigate(screenName);
		setOpen(false);
	};

	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				{[SCREEN.HOME, SCREEN.ADD_FLASH_CARD, SCREEN.FLASH_CARD].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => handleListItemClick(text)}>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{[SCREEN.LOGIN, SCREEN.SIGN_UP].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => handleListItemClick(text)}>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<Button onClick={toggleDrawer(true)}>メニュー</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
};
