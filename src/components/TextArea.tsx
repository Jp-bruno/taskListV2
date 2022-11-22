import { styled } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { ListContext } from "../context/ListContext";

const TextAreaStyled = styled("textarea")(({ theme }) => ({
  boxShadow: "inset 0px 0px 100px rgba(0,0,0,0.1)",
  border: "0",
  resize: "none",
  width: "100%",
  flexGrow: 2,
  fontSize: "1.2rem",
  padding: theme.spacing(2),
}));

export default function TextArea() {
  const { selectedTask } = useContext(ListContext);

  function isReadOnly() {
    return selectedTask?.finished ? true : false;
  }

  useEffect(() => {}, [selectedTask?.description]);

  return (
    <TextAreaStyled
      id="text"
      placeholder={
        selectedTask?.finished
          ? "Tarefa concluída"
          : selectedTask
          ? "Descreva sua tarefa."
          : "Selectione uma tarefa."
      }
      defaultValue={selectedTask?.description}
      readOnly={selectedTask ? isReadOnly() : true}
    />
  );
}
