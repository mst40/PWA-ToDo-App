import React, { useEffect, useState } from 'react'
import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import { ActionButton } from 'src/Components/ActionButton';
import { ToolBar } from 'src/Components/ToolBar';
import { SideBar } from 'src/Components/SideBar';
import { FormDialog } from 'src/Components/FormDialog';
import { TodoItem } from 'src/Components/TodoItem';
import { QR } from 'src/Components/QR';
import { AlertDialog } from 'src/Components/AlertDialog';
import localforage from 'localforage';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

  const handleToggleAlert = () => {
    setIsAlertOpen(isAlertOpen => !isAlertOpen)
  }

  const handleToggleDialog = () => {
    setIsDialogOpen(isDialogOpen => !isDialogOpen)
  }

  const handleToggleOR = () => {
    setIsQrOpen(isQrOpen => !isQrOpen)
  }

  const handleToggleDrawer = () => {
    setIsDrawerOpen(isDrawerOpen => !isDrawerOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    if (!text) {
      setIsDialogOpen(isDialogOpen => !isDialogOpen)
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    setTodos(prev => [newTodo, ...prev])
    setText('')
    setIsDialogOpen(isDialogOpen => !isDialogOpen)

  }

  const handleFilter = (filter: Filter) => {
    setFilter(filter)
  }

  const handleEmpty = () => {
    setTodos(todos => todos.filter(todo => !todo.removed))
  }

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    newValue: V
  ) => {
    setTodos(todos => {
      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, [key]: newValue }
        }
        return todo
      })
      return newTodos
    })
  }

  useEffect(() => {
    localforage
      .getItem('todo-20200101')
      .then(values => setTodos(values as Todo[]))
  }, [])

  useEffect(() => {
    localforage.setItem('todo-20200101', todos);
  }, [todos])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />

        {/* When isDrawerOpen == true */}
        <SideBar
          onSort={handleFilter}
          isDrawerOpen={isDrawerOpen}
          onToggleDrawer={handleToggleDrawer}
          onToggleQR={handleToggleOR}
        />

        {/* When isQrOpen == true */}
        <QR open={isQrOpen} onClose={handleToggleOR} />

        {/* When is FormDialogOpen == true */}
        <FormDialog
          text={text}
          onChange={handleChange}
          onSubmit={handleSubmit}
          dialogOpen={isDialogOpen}
          onToggleDialog={handleToggleDialog}
        />

        {/* When isAlertOpen == true */}
        <AlertDialog
          onEmpty={handleEmpty}
          onToggleAlert={handleToggleAlert}
          AlertOpen={isAlertOpen} />

        <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
        <ActionButton
          todos={todos}
          filter={filter}
          alertOpen={isAlertOpen}
          dialogOpen={isDialogOpen}
          onToggleAlert={handleToggleAlert}
          onToggleDialog={handleToggleDialog}
        />
      </ThemeProvider>
    </div>)
}
