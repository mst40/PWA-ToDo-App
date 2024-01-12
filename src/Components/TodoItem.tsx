type Props = {
    todos: Todo[];
    filter: Filter;
    onTodo: <K extends keyof Todo, V extends Todo[K]>(
        id: number,
        key: K,
        value: V
    ) => void
}
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
        {filteredTodos.map(todo => {
            return (
                <li key={todo.id}>
                    <input
                        type='checkbox'
                        disabled={todo.removed}
                        checked={todo.checked}
                        onChange={() => props.onTodo(todo.id, 'checked', !todo.checked)}
                    />

                    <input
                        type='text'
                        disabled={todo.checked || todo.removed}
                        value={todo.value}
                        onChange={e => props.onTodo(todo.id, 'value', e.target.value)}
                    />

                    <button
                        onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}
                    >
                        {todo.removed ? 'Restore' : 'Delete'}
                    </button>
                </li>)
        })}
    </ul >
    )
}