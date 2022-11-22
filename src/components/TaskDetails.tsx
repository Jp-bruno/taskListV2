import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { ListContext, ListContextType } from "../context/ListContext";

const StyledDetails = styled("div")`
  text-align: center;
  flex-basis: 1;
  height: 210px;
  transition: height 0.5s ease, backgroun-color 0.3s ease;

  .content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    flex-direction: row;
    padding-inline: 10px;

    .content-data {
      display: flex;
      flex-grow: 1;
      justify-content: space-evenly;

      @media (max-width: 500px) {
        flex-direction: column;
      }
    }

    .buttons-wrapper {
      display: flex;
      flex-direction: column;
      height: 60%;
      justify-content: space-evenly;
      align-items: center;
      flex-grow: 1;

      &.hide {
        display: none;
      }

      & button {
        width: 50%;

        @media (max-width: 500px) {
          width: 100%;
        }
      }

      @media (max-width: 500px) {
        width: 40%;
      }
    }
  }

  &.details-closed {
    height: 0;
  }

  &.green {
    background-color: #57fc576a;
  }
`;

export default function TaskDetails() {
  const { selectedTask, completeTask, saveTaskDescription } =
    useContext<ListContextType>(ListContext);

  return (
    <StyledDetails className={`${selectedTask ? "details-open" : "details-closed"} ${selectedTask?.finished ? 'green' : ''}`}>
      {selectedTask ? (
        <div className="content">
          <div className="content-data">
            <p>
              Data de criação <br /> {selectedTask?.creationDate}
            </p>
            <p>
              Data de finalização <br /> {selectedTask?.finishedDate}
            </p>
          </div>

          <div
            className={`buttons-wrapper ${
              selectedTask?.finished ? "hide" : "show"
            }`}
          >
            <Button
              color="success"
              variant="outlined"
              onClick={saveTaskDescription}
              disabled={selectedTask?.finished ? true : false}
            >
              Salvar
            </Button>
            {selectedTask?.finished ? (
              <Button disabled onClick={() => completeTask()} variant="outlined">
                Tarefa concluída!
              </Button>
            ) : (
              <Button
                color="success"
                variant="contained"
                onClick={() => completeTask()}
              >
                Completar tarefa
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </StyledDetails>
  );
}
