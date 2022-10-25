import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function TasksList() {
    return (
        <List>
            {['All mail', 'Trash', 'Spam', 'All mail', 'Trash', 'Spam', 'All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={Math.random() * 10000} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}