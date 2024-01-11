import React, { useState } from 'react'
import './App.css'

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = "all" | "checked" | "current" | 'removed'

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

  const handleEdit = (id: number, newValue: string) => {
    setTodos(todos => {
      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, value: newValue }
        }
        return todo
      })
      return newTodos
    })
  }

  const handleCheck = (id: number, checked: boolean) => {
    setTodos(todos => {
      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, checked }
        }
        return todo
      })
      return newTodos
    })
  }

  const handleRemove = (id: number, removed: boolean) => {
    setTodos(todos => {
      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, removed }
        }
        return todo
      })
      return newTodos
    })
  }

  const handleFilter = (filter: Filter) => {
    setFilter(filter)
  }

  const handleEmpty = () => {
    setTodos(todos => todos.filter(todo => !todo.removed))
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
                onChange={() => handleCheck(todo.id, !todo.checked)}
              />

              <input
                type='text'
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={e => handleEdit(todo.id, e.target.value)}
              />

              <button
                onClick={() => handleRemove(todo.id, !todo.removed)}
              >
                {todo.removed ? 'Restore' : 'Delete'}
              </button>
            </li>)
        })}
      </ul>
    </>
  )
}
