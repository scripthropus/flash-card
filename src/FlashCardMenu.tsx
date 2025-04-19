import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

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
				{["home", "add flash card", "flash card"].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => handleListItemClick(text)}>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["login", "sign up"].map((text) => (
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
			<Button onClick={toggleDrawer(true)}>Open drawer</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
};
