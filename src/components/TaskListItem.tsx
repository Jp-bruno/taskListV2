import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { ListItemClass, ListContext } from "../context/ListContext";
import { useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { StyledInput } from './TaskListNewTaskInput';

type TaskListItemProps = {
    task: ListItemClass
}

const ButtonStyles = {
    '& .MuiListItemIcon-root': {
        display: 'grid',
        placeItems: 'center',

    }
}

function RenderOptions({ ownerTaskTitle, toggleInputMode }: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const ListContextObject = useContext(ListContext);

    const open = Boolean(anchorEl);

    function handleClick(event: any) {
        console.log(event.currentTarget)

        setAnchorEl(event.target);
    };

    function handleClose(event: any) {
        if (event.nativeEvent.srcElement.classList.contains('edit-task-button')) {
            toggleInputMode();
            
            setTimeout(() => {
                const input = document.querySelector('.new-task-title-input') as HTMLInputElement;
                input.focus()
            }, 100)
        }

        setAnchorEl(null);
    };

    const selectedItemTitle = ListContextObject?.selectedTask?.title;

    if (selectedItemTitle === ownerTaskTitle) {
        return (
            <Box sx={{ zIndex: 100 }}>
                <Button onClick={handleClick} sx={{ padding: 0 }}>
                    <MoreHorizIcon />
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose} className='edit-task-button'>
                        <EditIcon sx={{ pointerEvents: 'none' }} />
                    </MenuItem>
                    <MenuItem onClick={handleClose} className='delete-task-button'>
                        <DeleteIcon sx={{ pointerEvents: 'none' }} />
                    </MenuItem>
                </Menu>
            </Box>
        );
    }

    return null
}

function InputMode({ toggleInputMode }: any) {
    return (
        <>
            <ListItemButton sx={{ padding: 0 }}>
                <StyledInput
                    type='text'
                    className='new-task-title-input'
                    onKeyDown={() => { }}
                // onBlur={toggleInputMode}
                />
            </ListItemButton>
        </>
    )
}

export default function TaskListItem({ task }: TaskListItemProps) {
    const ListContextObject = useContext(ListContext);

    const [inputMode, setInputMode] = useState(false);

    function toggleInputMode() {
        setInputMode((prevState) => !prevState)
    }

    const renderTaskOptions = {
        ownerTaskTitle: task.title,
        toggleInputMode,
    }


    return (
        <ListItem key={Math.random() * 10000} disablePadding>
            {
                inputMode ?
                    <InputMode toggleInputMode={toggleInputMode} />
                    :
                    <ListItemButton onClick={ListContextObject?.selectTask}>
                        <ListItemText primary={task.title} />
                        <RenderOptions {...renderTaskOptions} />
                    </ListItemButton>
            }

        </ListItem>
    )
}