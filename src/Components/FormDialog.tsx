import { Button, Dialog, TextField } from "@mui/material";
import React from "react";

type Props = {
    text: string;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    dialogOpen: boolean
    onToggleDialog: () => void;
}

export const FormDialog = (props: Props) => (
    <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
        <form onSubmit={e => {
            e.preventDefault()
            props.onSubmit()
        }}>
            <div style={{ margin: '1em' }}>
                <TextField
                    autoFocus
                    aria-label="todo-input"
                    variant="standard"
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif'
                    }}
                    label='Enter Task'
                    value={props.text}
                    onChange={e => props.onChange(e)}
                />
                <Button
                    aria-label="form-add"
                    color="secondary"
                    value={'ADD'}
                    onClick={props.onSubmit}
                >
                    Add
                </Button>
            </div>
        </form>
    </Dialog>
)
