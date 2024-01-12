import React, { useState } from 'react'
import { FormDialog } from './Components/FormDialog';
import { ActionButton } from './Components/ActionButton';
import { SideBar } from './Components/SideBar';
import { TodoItem } from './Components/TodoItem';
import { ToolBar } from './Components/ToolBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
      light: '#33ab9f',
      dark: '#00695f'
    },
    secondary: {
      main: '#26c6da',
      light: '#51d1e1',
      dark: '#1a8a98'
    }
  }
})

export const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    if (!text) { return; }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    setTodos(prev => [newTodo, ...prev])
    setText('')
  }

  const handleFilter = (filter: Filter) => {
    setFilter(filter)
  }

  const handleEmpty = () => {
    setTodos(todos => todos.filter(todo => !todo.removed))
  }

  //K => prop key(string) that you want to change.
  //V => new value.
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos(todos => {
      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, [key]: value }
        }
        return todo
      })
      return newTodos
    })
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <ToolBar filter={filter} />
        <SideBar onSort={handleFilter} />
        <FormDialog text={text} onChange={handleChange} onSubmit={handleSubmit} />
        <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
        <ActionButton todos={todos} onEmpty={handleEmpty} />
      </ThemeProvider>
    </div>)
}
