import { Box, Button, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";
import { ListItemClass, ListContext } from "../context/ListContext";
import { useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { StyledInput } from './TaskListNewTaskInput';

type TaskListItemProps = {
    task: ListItemClass
}

function RenderOptions({ ownerTaskTitle, toggleInputMode, removeTask }: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const ListContextObject = useContext(ListContext);

    const open = Boolean(anchorEl);

    function handleClick(event: any) {
        setAnchorEl(event.target);
    };

    function handleClose() {
        setAnchorEl(null)
    };

    function deleteTask() {
        removeTask(ownerTaskTitle);
        handleClose()
    }

    function editTaskTitle(event: any) {
        if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
            toggleInputMode();

            setTimeout(() => {
                const input = document.querySelector('.new-task-title-input') as HTMLInputElement;
                input.focus()
            }, 100)

            handleClose()
        }

        return
    }

    const selectedItemTitle = ListContextObject?.selectedTask?.title;

    if (selectedItemTitle === ownerTaskTitle) {
        return (
            <Box sx={{ zIndex: 100 }}>
                <Button onClick={handleClick} sx={{ padding: 0 }}>
                    <MoreHorizIcon />
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={editTaskTitle} className='edit-task-button'>
                        <EditIcon sx={{ pointerEvents: 'none' }} />
                    </MenuItem>

                    <MenuItem onClick={deleteTask} className='delete-task-button'>
                        <DeleteIcon sx={{ pointerEvents: 'none' }} />
                    </MenuItem>
                </Menu>
            </Box>
        );
    }

    return null
}

function InputMode({ toggleInputMode, renameTask, currentTaskName }: any) {
    function exitInputMode(ev: any) {
        if (ev.key === 'Escape') {
            toggleInputMode();
            return
        }

        if (ev.key === 'Enter') {
            if (ev.target.value === currentTaskName) {
                toggleInputMode();
                return
            }

            renameTask(ev.target.value)
            toggleInputMode();
            return
        }
    }

    return (
        <>
            <ListItemButton sx={{ padding: 0 }}>
                <StyledInput
                    type='text'
                    className='new-task-title-input'
                    onKeyDown={exitInputMode}
                    onBlur={toggleInputMode}
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

    const inputModeOptions = {
        toggleInputMode,
        renameTask: ListContextObject?.renameTask,
        currentTaskName: ListContextObject?.selectedTask?.title
    }

    const renderTaskOptions = {
        toggleInputMode,
        ownerTaskTitle: task.title,
        removeTask: ListContextObject?.removeTask
    }

    return (
        <ListItem disablePadding>
            {
                inputMode ?
                    <InputMode {...inputModeOptions} />
                    :
                    <ListItemButton onClick={ListContextObject?.selectTask} onFocus={ListContextObject?.selectTask}>
                        <ListItemText primary={task.title} />
                        <RenderOptions {...renderTaskOptions} />
                    </ListItemButton>
            }
        </ListItem>
    )
}