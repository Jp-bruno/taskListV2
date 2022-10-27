import { styled } from '@mui/material/styles';
import { DrawerHeader } from './DrawerHeader';

const drawerWidth = window.innerWidth < 500 ? window.innerWidth : 340;

const TextArea = styled('textarea')(({ theme }) => ({
    boxShadow: 'inset 0px 0px 100px rgba(0,0,0,0.1)',
    border: '0',
    resize: 'none',
    width: '100%',
    height: '70vh',
    fontSize: '1.2rem',
    padding: theme.spacing(2)
}));

const MainStytled = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


export default function Main({ open = false }) {
    return (
        <MainStytled open={open}>

            <DrawerHeader />

            <TextArea />

        </MainStytled>
    )
}