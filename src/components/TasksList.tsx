import { List } from "@mui/material";
import { useContext } from "react";
import { ListContext } from "../context/ListContext";
import TaskListItem from "./TaskListItem";
import TaskListNewTaskInput from "./TaskListNewTaskInput";

export default function TasksList() {
  const { tasks } = useContext(ListContext);

  const listLength = ((tasks?.length === null) || (tasks?.length === undefined)) ? 0 : tasks.length;

  return (
    <List>
      {listLength > 0
        ? tasks?.map((task: any) => {
            return <TaskListItem title={task.title} finished={task.finished} key={task.title} />;
          })
        : null} 

      <TaskListNewTaskInput />
    </List>
  );
}
