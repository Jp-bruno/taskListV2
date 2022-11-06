import { ListItem, ListItemButton, styled } from "@mui/material";
import { ListContext } from "../context/ListContext";
import { useContext } from 'react';

export const StyledInput = styled('input')`
    width: 100%;
    heigth: 100%;
    padding: 15px;
    font-size: 16px;
    border: 0;
`

export default function TaskListNewTaskInput() {
    const ListContextObject = useContext(ListContext);

    function createTask(ev: any) {
        if (ev.key === 'Enter') {
            const input = document.querySelector('.new-task-input') as HTMLInputElement;
            ListContextObject?.addTask(input.value);
            return
        }

        return
    }

    return (
        <ListItem key={Math.random() * 10000} disablePadding sx={{ padding: 0 }}>
            <ListItemButton sx={{padding: 0}}>
                <StyledInput type='text' className='new-task-input' placeholder="Nova tarefa" onKeyDown={createTask}></StyledInput>
            </ListItemButton>
        </ListItem>
    )
}