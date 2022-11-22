import { Button, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ListContext, ListContextType } from "../context/ListContext";
import { useContext, useState } from "react";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import RenderOptions from "./ListItemOptions";
import InputMode from "./ListItemInputMode";

const StyledListItem = styled(ListItem)`
  &.complete {
    background-color: #8bc34a;
  }
`;

type TaskListItemType = {
  title: string;
  finished: boolean;
};

export default function TaskListItem({ title, finished }: TaskListItemType) {
  const { renameTask, selectTask, removeTask, completeTask, selectedTask } =
    useContext<ListContextType>(ListContext);

  const [inputMode, setInputMode] = useState(false);

  function toggleInputMode() {
    setInputMode((prevState) => !prevState);
  }

  const inputModeProps = {
    toggleInputMode,
    renameTask: renameTask,
    currentTaskName: selectedTask?.title,
  };

  const renderTaskProps = {
    toggleInputMode,
    ownerTaskTitle: title,
    removeTask: removeTask,
    completeTask: completeTask,
    selectedTask: selectedTask,
  };

  return (
    <StyledListItem disablePadding className={finished ? "complete" : ""}>
      {inputMode ? (
        <InputMode {...inputModeProps} />
      ) : (
        <>
          <ListItemButton onClick={selectTask} onFocus={selectTask}>
            <ListItemText primary={title} />
            {finished ? null : <RenderOptions {...renderTaskProps} />}
          </ListItemButton>
          {finished && selectedTask?.title === title ? (
            <Button onClick={removeTask}>
              <DeleteIcon sx={{ pointerEvents: "none", color: "white" }} />
            </Button>
          ) : null}
        </>
      )}
    </StyledListItem>
  );
}
