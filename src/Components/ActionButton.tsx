import { Fab, Icon, styled } from "@mui/material";
import { orange } from "@mui/material/colors";

type Props = {
    todos: Todo[];
    filter: Filter;
    alertOpen: boolean;
    dialogOpen: boolean;
    onToggleAlert: () => void
    onToggleDialog: () => void
}

const FabButton = styled(Fab)({
    position: 'fixed',
    right: 15,
    bottom: 15,
})

export const ActionButton = (props: Props) => {
    const empty: boolean = props.todos.filter(todo => todo.removed).length === 0
    return (
        <>
            {props.filter === 'removed' ? (
                <FabButton
                    aria-label="fab-delete-button"
                    style={{ color: orange[400] }}
                    onClick={props.onToggleAlert}
                    disabled={empty || props.alertOpen}
                >
                    <Icon>delete</Icon>
                </FabButton>
            ) : (
                <FabButton
                    aria-label="fab-add-button"
                    color="primary"
                    onClick={props.onToggleDialog}
                    disabled={props.filter === 'checked' || props.dialogOpen}
                >
                    <Icon>edit</Icon>
                </FabButton>)}
        </>
    )
}