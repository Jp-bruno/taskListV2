import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useContext } from "react";
import { ListContext } from '../context/ListContext';
import { ListItemClass } from '../context/ListContext'

export default function TasksList() {
    const ListContextObject = useContext(ListContext);

    const listLength = ListContextObject?.tasks.length === undefined ? 0 : ListContextObject?.tasks.length

    return (
        <List>
            {
                listLength > 0 ? ListContextObject?.tasks.map((task) => (
                    <ListItem key={Math.random() * 10000} disablePadding>
                        <ListItemButton onClick={ListContextObject?.selectTask}>
                            <ListItemText primary={(task as ListItemClass).title} />
                        </ListItemButton>
                    </ListItem>
                ))
                    :

                    <ListItem key={Math.random() * 10000} disablePadding> {/*caso a lista esteja vazia*/}
                        <ListItemButton onClick={ListContextObject?.addTask}>
                            <ListItemText primary={'oi'} />
                        </ListItemButton>
                    </ListItem>
            }
        </List>
    )
}