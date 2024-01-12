import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
    filter: Filter
}

const traslator = (arg: Filter): string => {
    switch (arg) {
        case 'all': {
            return 'All'
        }
        case 'checked': {
            return 'Complete'
        }
        case 'current': {
            return 'Current'
        }
        case 'removed': {
            return 'Trash Box'
        }
        default: {
            return 'ToDo'
        }
    }
}

export const ToolBar = (props: Props) => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    aria-label="menue-button"
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Typography>{traslator(props.filter)}</Typography>
            </Toolbar>
        </AppBar>
    </Box>
)