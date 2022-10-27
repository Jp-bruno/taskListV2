import { useState, createContext, useEffect, PropsWithChildren, useRef, MutableRefObject } from 'react';

type ListContextType = {
    addTask: () => void,
    removeTask: () => void,
    renameTask: () => void,
    completeTask: () => void,
    selectTask: (ev:any) => void,
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
    const [tasks, setTasks] = useState<[] | ListItemClass[]>([new ListItemClass('Primeira tarefa'), new ListItemClass('Segunda tarefa')])
    const [selectedTask, setSelectedTask] = useState<ListItemClass | null>(null)

    function addTask() {
        setTasks((prevState) => [...prevState, new ListItemClass()])
    }

    function removeTask() {

    }

    function renameTask() {

    }

    function completeTask() {

    }

    function selectTask(ev:any) {
        const taskName = ev.target.textContent;

        if (selectedTask?.title === taskName) {
            return
        }

        const theTask = tasks.find(element => element.title === taskName);

        console.log(theTask)

        setSelectedTask(() => theTask as ListItemClass)
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