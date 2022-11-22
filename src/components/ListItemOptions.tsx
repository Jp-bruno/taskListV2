import { Box, Button, Menu, MenuItem } from "@mui/material";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { Task } from "../context/ListContext";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

type OptionsType = {
  title: string;
  finished: boolean;
  toggleInputMode: () => void;
  removeTask: (taskTitle: string) => void;
  completeTask: (taskTitle: string) => void;
  selectedTask: Task | null;
};

export default function RenderOptions({ title, finished, toggleInputMode, removeTask, completeTask, selectedTask }: OptionsType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClick(event: any) {
    setAnchorEl(event.target);
  }

  function handleTaskOptionsClose() {
    setAnchorEl(null);
  }

  function deleteTask() {
    removeTask(title);
    handleTaskOptionsClose();
  }

  function openEditTaskTitleMode(event: MouseEvent | KeyboardEvent) {
    if ((event.type === "keydown" && (event as KeyboardEvent).key === "Enter") || event.type === "click") {
      toggleInputMode();

      setTimeout(() => {
        const input = document.querySelector(".new-task-title-input") as HTMLInputElement;
        input.focus();
      }, 100);

      handleTaskOptionsClose();
    }

    return;
  }

  function finishTask(taskTitle:string) {
    completeTask(taskTitle);
    handleTaskOptionsClose();
  }

  if (finished) {
    return (
      <Box>
        <Button onClick={handleClick} sx={{ height: "100%" }}>
          <MoreHorizIcon sx={{ color: "black" }} />
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleTaskOptionsClose}>
          <MenuItem onClick={deleteTask}>
            <DeleteIcon sx={{ pointerEvents: "none" }} />
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box>
      <Button onClick={handleClick} sx={{ height: "100%" }}>
        <MoreHorizIcon sx={{ color: "black" }} />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleTaskOptionsClose}>
        <MenuItem onClick={() => finishTask(title)}>
          <CheckIcon sx={{ pointerEvents: "none" }} />
        </MenuItem>

        <MenuItem onClick={(ev) => openEditTaskTitleMode(ev)} onKeyDown={(ev) => openEditTaskTitleMode(ev)}>
          <EditIcon sx={{ pointerEvents: "none" }} />
        </MenuItem>

        <MenuItem onClick={deleteTask}>
          <DeleteIcon sx={{ pointerEvents: "none" }} />
        </MenuItem>
      </Menu>
    </Box>
  );
}
