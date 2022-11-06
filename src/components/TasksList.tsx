import { List } from "@mui/material";
import { useContext } from "react";
import { ListContext } from '../context/ListContext';
import { Children } from 'react';
import TaskListItem from "./TaskListItem";
import TaskListNewTaskInput from "./TaskListNewTaskInput";

export default function TasksList() {
    const ListContextObject = useContext(ListContext);

    const listLength = ListContextObject?.tasks.length === undefined ? 0 : ListContextObject?.tasks.length

    return (
        <List>
            {
                listLength > 0 ?

                    ListContextObject?.tasks.map((task: any) => (
                        <TaskListItem task={task} key={Math.random() * 2000} />
                    ))


                    :

                    null
            }

            <TaskListNewTaskInput />
        </List>
    )
}