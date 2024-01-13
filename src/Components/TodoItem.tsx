import { Card, Icon, TextField, styled } from "@mui/material";
import { orange, teal, grey } from "@mui/material/colors";

type Props = {
    todos: Todo[];
    filter: Filter;
    onTodo: <K extends keyof Todo, V extends Todo[K]>(
        id: number,
        key: K,
        value: V
    ) => void
}

const Container = styled('div')({
    margin: '0 auto',
    maxWidth: '640px',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif'
})

const TodoCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const Form = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: '16px',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}));

const Button = styled('button')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
}));

const Trash = styled('button')(() => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
}));

export const TodoItem = (props: Props) => {
    const filteredTodos: Todo[] = props.todos.filter(todo => {
        switch (props.filter) {
            case 'all': {
                return !todo.removed;
            }
            case 'checked': {
                return !todo.removed && todo.checked
            }
            case 'current': {
                return !todo.removed && !todo.checked
            }
            case 'removed': {
                return todo.removed;
            }
        }
    })

    return (<ul>
        <Container>
            {filteredTodos.map(todo => {
                return (
                    <TodoCard key={todo.id}>
                        <Form>
                            <TextField
                                aria-label={`todo-${todo.value}`}
                                fullWidth
                                variant="standard"
                                value={todo.value}
                                onChange={e => props.onTodo(todo.id, 'value', e.target.value)}
                                disabled={todo.checked || todo.removed}
                            />
                        </Form>
                        <ButtonContainer>
                            <Button
                                aria-label="`todo-check-${todo.value}`"
                                onClick={() => props.onTodo(todo.id, 'checked', !todo.checked)}
                                disabled={props.filter === 'removed'}
                            >
                                {todo.checked ? (
                                    <Icon
                                        aria-label={`todo-check-${todo.value}`}
                                        style={{
                                            color: props.filter !== 'removed' ? orange.A400 : grey[500]
                                        }}
                                    >
                                        task_alt
                                    </Icon>
                                ) : (
                                    <Icon
                                        aria-label={`todo-uncheck-${todo.value}`}
                                        style={{
                                            color: props.filter !== 'removed' ? teal.A400 : grey[500]
                                        }}
                                    >
                                        radio_button_unchecked
                                    </Icon>
                                )}
                            </Button>
                            <Trash
                                aria-label={`todo-remove-${todo.value}`}
                                onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}
                            >
                                {todo.removed ? (
                                    <Icon
                                        aria-label={`todo-undo-${todo.value}`}
                                        style={{ color: teal[500] }}
                                    >
                                        undo
                                    </Icon>
                                ) : (
                                    <Icon
                                        aria-label={`todo-undo-${todo.value}`}
                                        style={{ color: teal[500] }}
                                    >
                                        delete
                                    </Icon>
                                )}
                            </Trash>
                        </ButtonContainer>
                    </TodoCard>
                )
            })}
        </Container>
    </ul >
    )
}