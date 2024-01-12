import pjson from '../../package.json'
import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material"

type Props = {
    onSort: (filter: Filter) => void,
    isDrawerOpen: boolean,
    onToggleDrawer: () => void
}

const DrawerList = styled('div')(() => ({ width: 250 }));

const DrawerHeader = styled('div')(() => ({
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    backgroundColor: '#009688',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}))

const DrawerAvator = styled(Avatar)(({ theme }) => ({
    backgroundColor: '#26c6da',
    width: theme.spacing(6),
    height: theme.spacing(6)
}))

export const SideBar = (props: Props) => (
    <Drawer
        variant="temporary"
        open={props.isDrawerOpen}
        onClose={props.onToggleDrawer}
    >
        <DrawerList role="presentation" onClick={props.onToggleDrawer}>
            <DrawerHeader>
                <DrawerAvator>
                    <Icon>create</Icon>
                </DrawerAvator>
                <p>ToDo v{pjson.version}</p>
            </DrawerHeader>
            <List>
                <ListItemButton
                    aria-label='list-all'
                    onClick={() => props.onSort('all')}
                >
                    <ListItemIcon>
                        <Icon>all_inbox</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="All Tasks" />
                </ListItemButton>
                <ListItemButton
                    aria-label='list-checked'
                    onClick={() => props.onSort('checked')}
                >
                    <ListItemIcon>
                        <Icon>task_alt</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="Done Tasks" />
                </ListItemButton>
                <ListItemButton
                    aria-label='list-current'
                    onClick={() => props.onSort('current')}
                >
                    <ListItemIcon>
                        <Icon>radio_button_unchecked</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="Current" />
                </ListItemButton>
                <ListItemButton
                    aria-label='list-removed'
                    onClick={() => props.onSort('removed')}
                >
                    <ListItemIcon>
                        <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="Trash Box" />
                </ListItemButton>
                <Divider />
            </List>
        </DrawerList>
    </Drawer>
)