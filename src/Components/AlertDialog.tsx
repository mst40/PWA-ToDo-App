import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material"
import { orange } from "@mui/material/colors";

type Props = {
    AlertOpen: boolean;
    onToggleAlert: () => void;
    onEmpty: () => void
}

const Alert = styled(Dialog)(() => ({
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif'
}))

export const AlertDialog = (props: Props) => (
    <Alert open={props.AlertOpen} onClose={props.onToggleAlert}>
        <DialogTitle>
            Alert
        </DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to empty the Trash Box?</DialogContentText>
            <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                aria-label="alert-cancel"
                onClick={props.onToggleAlert}
                color="primary"
            >
                Cancel
            </Button>
            <Button
                aria-label="alert-ok"
                onClick={() => {
                    props.onToggleAlert()
                    props.onEmpty()
                }}
                style={{ color: orange[600] }}
            >
                OK
            </Button>
        </DialogActions>
    </Alert >
)