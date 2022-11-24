import { useState, createContext, PropsWithChildren, useContext, MouseEvent, useEffect } from "react";
import { DrawerContext } from "./DrawerContext";

function getFullDateAndTime() {
  const newDate = new Date(Date());
  const date = newDate.toLocaleDateString("pt-BR");
  const time = newDate.toLocaleTimeString("pt-BR");

  return `${date} às ${time}`;
}

function writeOnTextArea(text = "") {
  const textArea = document.querySelector("#text") as HTMLTextAreaElement;
  textArea.value = text;
}

export type ListContextType = {
  addTask: (taskTitle: string) => void;
  removeTask: (taskTitle: string) => void;
  renameTask: (previusTitle: string, newTaskTitle: string) => void;
  completeTask: (taskTitle?: string) => void;
  selectTask: (ev: any) => void;
  selectedTask: Task | null;
  saveTaskDescription: () => void;
  tasks: Task[];
};

export type TaskType = {
  title: string;
  description?: string;
  creationDate?: string;
  finished: boolean;
  finishedDate?: string;
  timeout?: string;
};

export class Task {
  title: string;
  description?: string;
  creationDate?: string;
  finished: boolean;
  finishedDate?: string;
  timeout?: string;
  constructor(title = "", description = "", creationDate = getFullDateAndTime(), finished = false, finishedDate = "--:--", timeout = "--:--") {
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.finished = finished;
    this.finishedDate = finishedDate;
    this.timeout = timeout;
  }
}

export const ListContext = createContext({} as ListContextType);

export default function ListContextProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<[] | Task[]>([new Task("Primeira tarefa", "primeira")]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { toggleDrawer } = useContext(DrawerContext);

  function taskAlreadyExits(taskTitle: string) {
    return tasks.some((task: any) => task.title === taskTitle);
  }

  function taskAlreadySelected(taskTitle: string) {
    return selectedTask?.title === taskTitle ? true : false;
  }

  function addTask(taskTitle: string) {
    if (taskAlreadyExits(taskTitle) || !/\S/gi.test(taskTitle)) {
      return;
    }

    setTasks((prevState) => {
      const newTasksArray = [...prevState, new Task(taskTitle)];

      window.localStorage.setItem("tasks", JSON.stringify(newTasksArray));

      return newTasksArray;
    });

    return;
  }

  function removeTask(taskTitle = selectedTask?.title) {
    setTasks((prevState) => {
      const newTasksArray = prevState.filter((task: any) => task.title !== taskTitle);

      window.localStorage.setItem("tasks", JSON.stringify(newTasksArray));

      return newTasksArray;
    });

    setSelectedTask(() => null);

    writeOnTextArea();
  }

  function selectTask(ev: MouseEvent) {
    const taskName = ev.currentTarget.textContent as string;

    if (window.innerWidth > 900) {
      if (taskAlreadySelected(taskName)) {
        return;
      }

      const theTask = tasks.find((task: any) => task.title === taskName);

      saveTaskDescription(); //save the current task description
      setSelectedTask(() => theTask as Task); //set the current task to the selected one
      writeOnTextArea(theTask?.description);

      return;
    }

    if (taskAlreadySelected(taskName)) {
      toggleDrawer();
      return;
    }

    const theTask = tasks.find((task: any) => task.title === taskName);

    saveTaskDescription();
    setSelectedTask(() => theTask as Task);
    writeOnTextArea(theTask?.description);
    toggleDrawer();

    return;
  }

  function renameTask(previusTitle: string, newTaskTitle: string) {
    const mapCallback = (task: any) => {
      if (task.title === previusTitle) {
        task.title = newTaskTitle;
        return task;
      } else {
        return task;
      }
    };

    setTasks((prevState) => {
      const newTasksArray = prevState.map(mapCallback);

      window.localStorage.setItem("tasks", JSON.stringify(newTasksArray));

      return newTasksArray;
    });

    setSelectedTask(() => null);
  }

  function saveTaskDescription() {
    const textArea = document.querySelector("#text") as HTMLTextAreaElement;

    setTasks((prevState) => {
      const newTasksArray = prevState.map((task) => {
        if (task.title === selectedTask?.title) {
          task.description = textArea.value;
          return task;
        }

        return task;
      });

      window.localStorage.setItem("tasks", JSON.stringify(newTasksArray));

      return newTasksArray;
    });
  }

  function completeTask(taskTitle = selectedTask?.title) {
    setTasks((prevState) => {
      const newTasksArray = prevState.map((task: any) => {
        if (task.title === taskTitle) {
          task.finished = true;
          task.finishedDate = getFullDateAndTime();
          return task;
        }

        return task;
      });

      window.localStorage.setItem("tasks", JSON.stringify(newTasksArray));

      return newTasksArray;
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

  useEffect(() => {
    const localStorageTasks = JSON.parse(window.localStorage.getItem("tasks") as string)
    setTasks(localStorageTasks)
  }, [])

  return <ListContext.Provider value={providerValueObject}>{children}</ListContext.Provider>;
}
