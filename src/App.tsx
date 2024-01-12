import React, { useState } from 'react'
import './App.css'

export const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos: Todo[] = todos.filter(todo => {
    switch (filter) {
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
      <select
        defaultValue={'all'}
        onChange={e => handleFilter(e.target.value as Filter)}
      >
        <option value="all">All</option>
        <option value="checked">Done</option>
        <option value="current">Current</option>
        <option value="removed">Trash Can</option>
      </select>

      {filter === 'removed' ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter(todo => todo.removed).length === 0}
        >
          Clear Trash Can
        </button>
      ) : (
        filter !== 'checked' && (
          <form onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}>

            <input type='text' value={text} onChange={e => handleChange(e)} />

            <input type='submit' value={'ADD'} />
          </form>))}


      <ul>
        {filteredTodos.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type='checkbox'
                disabled={todo.removed}
                checked={todo.checked}
                //checkフラグを反転
                onChange={() => handleTodo(todo.id, 'checked', !todo.checked)}
              />

              <input
                type='text'
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={e => handleTodo(todo.id, 'value', e.target.value)}
              />

              <button
                onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}
              >
                {todo.removed ? 'Restore' : 'Delete'}
              </button>
            </li>)
        })}
      </ul>
    </>
  )
}
