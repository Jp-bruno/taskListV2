import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { ListItemClass, ListContext } from "../context/ListContext";
import { useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type TaskListItemProps = {
    task: ListItemClass
}

type RenderOptionsProps = {
    selectedItemTitle: string | undefined,
    thisTaskTitle: string | undefined
}

const ButtonStyles = {
    '& .MuiListItemIcon-root': {
        display: 'grid',
        placeItems: 'center',

    }
}

function RenderOptions({ selectedItemTitle, thisTaskTitle }: RenderOptionsProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        console.log(event.currentTarget)

        setAnchorEl(event.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (selectedItemTitle === thisTaskTitle) {
        return (
            <Box sx={{zIndex: 100}}>
                <Button onClick={handleClick} sx={{padding: 0}}>
                    <MoreHorizIcon />
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </Box>
        );
    }

    return null
}

export default function TaskListItem({ task }: TaskListItemProps) {
    const ListContextObject = useContext(ListContext);

    return (
        <ListItem key={Math.random() * 10000} disablePadding>
            <ListItemButton onClick={ListContextObject?.selectTask}>
                <ListItemText primary={task.title} />
                <RenderOptions selectedItemTitle={ListContextObject?.selectedTask?.title} thisTaskTitle={task.title} />
            </ListItemButton>
        </ListItem>
    )
}