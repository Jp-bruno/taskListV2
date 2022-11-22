import { useState, createContext, PropsWithChildren, useContext, MouseEvent } from "react";
import { DrawerContext } from "./DrawerContext";

function getFullDateAndTime() {
  const newDate = new Date(Date());
  const date = newDate.toLocaleDateString("pt-BR");
  const time = newDate.toLocaleTimeString("pt-BR");

  return `${date} às ${time}`;
}

function writeOnTextArea(text = "") {
  const textArea = document.querySelector("#text") as HTMLTextAreaElement;
  textArea.value = text
}

export type ListContextType = {
  addTask: (taskTitle: string) => void;
  removeTask: () => void;
  renameTask: (newTaskTitle: string) => void;
  completeTask: () => void;
  selectTask: (ev: any) => void;
  selectedTask: Task | null;
  saveTaskDescription: () => void;
  tasks: object[];
};

export type TaskType = {
  title: string;
  description?: string;
  creationDate?: string;
  finished?: boolean;
  finishedDate?: string;
  timeout?: string;
};

export class Task {
  title: string;
  description?: string;
  creationDate?: string;
  finished?: boolean;
  finishedDate?: string;
  timeout?: string;
  constructor(
    title = "",
    description = "",
    creationDate = getFullDateAndTime(),
    finished = false,
    finishedDate = "--:--",
    timeout = "--:--"
  ) {
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.finished = finished;
    this.finishedDate = finishedDate;
    this.timeout = timeout;
  }
}

export const ListContext = createContext<ListContextType>(
  {} as ListContextType
);

export default function ListContextProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<[] | Task[]>([
    new Task("1", "primeira"),
    new Task("2", "segunda"),
    new Task("3", "terceira"),
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { handleDrawerClose } = useContext(DrawerContext);

  function taskAlreadyExits(taskTitle: string) {
    return tasks.some((task) => task.title === taskTitle);
  }

  function addTask(taskTitle: string) {
    if (taskAlreadyExits(taskTitle) || !/\S/gi.test(taskTitle)) {
      return;
    }

    setTasks((prevState) => [...prevState, new Task(taskTitle)]);
    return;
  }

  function removeTask() {

    setTasks((prevState) =>
      prevState.filter((task) => task.title !== selectedTask?.title)
    );

    setSelectedTask(() => null);

    writeOnTextArea()
  }

  function selectTask(ev: MouseEvent) {
    const taskName = ev.currentTarget.textContent;
    
    
    if (selectedTask?.title === taskName) {
      return;
    }
    

    const theTask = tasks.find((element) => element.title === taskName);

    setSelectedTask(() => theTask as Task);

    handleDrawerClose();

    writeOnTextArea(theTask?.description)
  }

  function renameTask(newTaskTitle: string) {
    const mapCallback = (task: any) => {
      if (task.title === selectedTask?.title) {
        task.title = newTaskTitle;
        return task;
      } else {
        return task;
      }
    };

    setTasks((prevState) => prevState.map(mapCallback));
  }

  function saveTaskDescription() {
    const textArea = document.querySelector("#text") as HTMLTextAreaElement;

    setTasks(prevState => {
      return prevState.map(task => {
        if (task.title === selectedTask?.title) {
          task.description = textArea.value
          return task
        }

        return task
      })
    })
  }

  function completeTask() {
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (task.title === selectedTask?.title) {
          task.finished = true;
          task.finishedDate = getFullDateAndTime();
          return task;
        }

        return task;
      });
    });
  }

  const providerValueObject = {
    addTask,
    removeTask,
    renameTask,
    completeTask,
    selectTask,
    saveTaskDescription,
    selectedTask,
    tasks,
  };

  return (
    <ListContext.Provider value={providerValueObject}>
      {children}
    </ListContext.Provider>
  );
}
