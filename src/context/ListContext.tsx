import { useState, createContext, useEffect, PropsWithChildren, useRef, MutableRefObject } from 'react';

type ListContextType = {
    addTask: (taskTitle: string) => void,
    removeTask: (taskTitle: string) => void,
    renameTask: (newTaskTitle: string) => void,
    completeTask: () => void,
    selectTask: (ev: any) => void,
    selectedTask: ListItemClass | null,
    tasks: object[]
}

export class ListItemClass {
    title?: string;
    description?: string;
    creationDate?: string;
    finished?: boolean;
    finishedDate?: string;
    timeout?: string;

    constructor(title = "Título", description = "Descrição", creationDate = "--:--", finished = false, finishedDate = "--:--", timeout = "--:--") {
        this.title = title
        this.description = description
        this.creationDate = creationDate
        this.finished = finished
        this.finishedDate = finishedDate
        this.timeout = timeout
    }
}

export const ListContext = createContext<ListContextType | null>(null);

export default function ListContextProvider({ children }: PropsWithChildren) {
    const [tasks, setTasks] = useState<[] | ListItemClass[]>([new ListItemClass('1'), new ListItemClass('2'), new ListItemClass('3')])
    const [selectedTask, setSelectedTask] = useState<ListItemClass | null>(null);

    function taskAlreadyExits(taskTitle: string) {
        return tasks.some(task => task.title === taskTitle)
    }

    function addTask(taskTitle: string) {
        if (taskAlreadyExits(taskTitle)) {
            return
        }

        setTasks((prevState) => [...prevState, new ListItemClass(taskTitle)]);
        return
    }

    function removeTask(taskTitle: string) {
        setTasks((prevState) => prevState.filter(task => task.title !== taskTitle))
        setSelectedTask(() => null)
    }

    function selectTask(ev: any) {
        const taskName = ev.currentTarget.textContent;

        if (selectedTask?.title === taskName) {
            return
        }

        const theTask = tasks.find(element => element.title === taskName);

        setSelectedTask(() => theTask as ListItemClass)
    }

    function renameTask(newTaskTitle: string) {
        const mapCallback = (task: any) => {
            if (task.title === selectedTask?.title) {
                task.title = newTaskTitle
                return task
            } else {
                return task
            }
        }

        setTasks((prevState) => prevState.map(mapCallback))
    }

    function completeTask() {

    }

    const providerValueObject = {
        addTask,
        removeTask,
        renameTask,
        completeTask,
        selectTask,
        selectedTask,
        tasks
    }

    return (
        <ListContext.Provider value={providerValueObject}>
            {children}
        </ListContext.Provider>
    )
}