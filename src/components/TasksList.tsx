import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useContext } from "react";
import { ListContext } from '../context/ListContext';
import { ListItemClass } from '../context/ListContext';
import TaskListItem from "./TaskListItem";
import TaskListNewTaskInput from "./TaskListNewTaskInput";

export default function TasksList() {
    const ListContextObject = useContext(ListContext);

    const listLength = ListContextObject?.tasks.length === undefined ? 0 : ListContextObject?.tasks.length

    return (
        <List>
            {
                listLength > 0 ?
                    ListContextObject?.tasks.map((task) => (
                        <TaskListItem task={task} />
                    ))

                    :

                    null
            }

            <TaskListNewTaskInput />
        </List>
    )
}