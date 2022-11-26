import { ListItemButton } from "@mui/material";
import { StyledInput } from "./TaskListNewTaskInput";

export default function NewTaskTitleInput({ toggleInputMode, renameTask, currentTaskName }: any) {
    function exitInputMode(ev: any) {
      if (ev.key === "Escape") {
        toggleInputMode();
        return;
      }
  
      if (ev.key === "Enter") {
        if (ev.target.value === currentTaskName) {
          toggleInputMode();
          return;
        }
  
        renameTask(ev, currentTaskName, ev.target.value);
        toggleInputMode();
        return;
      }
    }
  
    return (
      <>
        <ListItemButton sx={{ padding: 0 }}>
          <StyledInput
            type="text"
            className="new-task-title-input"
            onKeyDown={exitInputMode}
            onBlur={toggleInputMode}
          />
        </ListItemButton>
      </>
    );
  }