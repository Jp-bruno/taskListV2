import { Box, Button, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";
import { ListItemClass, ListContext } from "../context/ListContext";
import { useContext, useState } from 'react';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import { StyledInput } from './TaskListNewTaskInput';

type TaskListItemProps = {
    task: ListItemClass
}

function RenderOptions({ ownerTaskTitle, toggleInputMode, removeTask, completeTask }: any) {
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

    function finishTask() {
        completeTask();
        handleClose();
    }

    const selectedItemTitle = ListContextObject?.selectedTask?.title;

    if (selectedItemTitle === ownerTaskTitle) {
        return (
            <Box sx={{ zIndex: 100 }}>
                <Button onClick={handleClick} sx={{ padding: 0 }}>
                    <MoreHorizIcon sx={{ color: 'black' }} />
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={finishTask}>
                        <CheckIcon sx={{ pointerEvents: 'none' }} />
                    </MenuItem>

                    <MenuItem onClick={editTaskTitle}>
                        <EditIcon sx={{ pointerEvents: 'none' }} />
                    </MenuItem>

                    <MenuItem onClick={deleteTask}>
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

const StyledListItem = styled(ListItem)`
    &.complete { 
        background-color: #8bc34a;
    }
`

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
        removeTask: ListContextObject?.removeTask,
        completeTask: ListContextObject?.completeTask,
    }

    return (
        <StyledListItem disablePadding className={task.finished ? 'complete' : ''}>
            {
                inputMode ?
                    <InputMode {...inputModeOptions} />
                    :
                    <>
                        <ListItemButton onClick={ListContextObject?.selectTask} onFocus={ListContextObject?.selectTask}>
                            <ListItemText primary={task.title} />
                            {task.finished ? null : <RenderOptions {...renderTaskOptions} />}
                        </ListItemButton>
                        {
                            task.finished && (ListContextObject?.selectedTask?.title === task.title) ?
                                <Button onClick={() => ListContextObject?.removeTask(task.title)}>
                                    <DeleteIcon sx={{ pointerEvents: 'none', color: 'white' }} />
                                </Button>

                                :

                                null
                        }
                    </>


            }
        </StyledListItem>
    )
}