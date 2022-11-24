import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ListContext, ListContextType } from "../context/ListContext";
import { useContext, useState } from "react";
import styled from "@emotion/styled";
import RenderOptions from "./ListItemOptions";
import NewTaskTitleInput from "./NewTaskTitleInput";

const StyledListItem = styled(ListItem)`
  &.complete {
    background-color: #8bc34a;
  }

  align-items: stretch;
`;

type TaskListItemType = {
  title: string;
  finished: boolean;
};

export default function TaskListItem({ title, finished }: TaskListItemType) {
  const { renameTask, selectTask, removeTask, completeTask, selectedTask } = useContext<ListContextType>(ListContext);

  //O state do inputMode fica aqui para que tanto o Input quanto as TaskOptions tenham acesso ao state
  const [inputMode, setInputMode] = useState(false);

  function toggleInputMode() {
    setInputMode((prevState) => !prevState);
  }

  const inputModeProps = {
    toggleInputMode,
    renameTask,
    currentTaskName: title,
  };

  const renderTaskOptionsProps = {
    toggleInputMode,
    title,
    finished,
    removeTask,
    completeTask,
    selectedTask,
  };

  return (
    <StyledListItem disablePadding className={finished ? "complete" : ""}>
      {inputMode ? (
        <NewTaskTitleInput {...inputModeProps} />
      ) : (
        <>
          <ListItemButton onClick={selectTask}>
            <ListItemText primary={title} />
          </ListItemButton>

          <RenderOptions {...renderTaskOptionsProps} />
        </>
      )}
    </StyledListItem>
  );
}
