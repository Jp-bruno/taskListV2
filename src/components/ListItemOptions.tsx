import { Box, Button, Menu, MenuItem } from "@mui/material";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { Task } from "../context/ListContext";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

type OptionsType = {
  ownerTaskTitle: string;
  toggleInputMode: () => void;
  removeTask: (taskTitle: string) => void;
  completeTask: () => void;
  selectedTask: Task | null;
};

export default function RenderOptions({
  ownerTaskTitle,
  toggleInputMode,
  removeTask,
  completeTask,
  selectedTask,
}: OptionsType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClick(event: any) {
    setAnchorEl(event.target);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function deleteTask() {
    removeTask(ownerTaskTitle);
    handleClose();
  }

  function editTaskTitle(event: MouseEvent | KeyboardEvent) {
    if (
      (event.type === "keydown" && (event as KeyboardEvent).key === "Enter") ||
      event.type === "click"
    ) {
      toggleInputMode();

      setTimeout(() => {
        const input = document.querySelector(
          ".new-task-title-input"
        ) as HTMLInputElement;
        input.focus();
      }, 100);

      handleClose();
    }

    return;
  }

  function finishTask() {
    completeTask();
    handleClose();
  }

  if (selectedTask?.title === ownerTaskTitle) {
    return (
      <Box sx={{ zIndex: 100 }}>
        <Button onClick={handleClick} sx={{ padding: 0 }}>
          <MoreHorizIcon sx={{ color: "black" }} />
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={finishTask}>
            <CheckIcon sx={{ pointerEvents: "none" }} />
          </MenuItem>

          <MenuItem
            onClick={(ev) => editTaskTitle(ev)}
            onKeyDown={(ev) => editTaskTitle(ev)}
          >
            <EditIcon sx={{ pointerEvents: "none" }} />
          </MenuItem>

          <MenuItem onClick={deleteTask}>
            <DeleteIcon sx={{ pointerEvents: "none" }} />
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return null;
}
