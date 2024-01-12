import React, { useState } from 'react'
import './App.css'
import { FormDialog } from './Components/FormDialog';
import { ActionButton } from './Components/ActionButton';
import { SideBar } from './Components/SideBar';
import { TodoItem } from './Components/TodoItem';

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
    <>
      <SideBar onSort={handleFilter} />

      {filter === 'removed' ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter(todo => todo.removed).length === 0}
        >
          Clear Trash Can
        </button>
      ) : (
        filter !== 'checked' &&
        <FormDialog
          text={text}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />)}

      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </>)
}
