import React, { useState } from 'react'
import './App.css'

type Todo = {
  value: string;
  readonly id: number;
}

export const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    if (!text) { return; }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    }

    setTodos(prev => [newTodo, ...prev])
    setText('')
  }

  const handleEdit = (id: number, newValue: string) => {
    setTodos(todos => {
      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          //{id:todo.id, value:newValue}
          return { ...todo, value: newValue }
        }
        return todo
      })
      console.log('original')
      todos.map(todo => { console.log(`id: ${todo.id} value:${todo.value}`) })
      return newTodos
    })
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}>
        <input type='text'
          value={text}
          onChange={e => handleChange(e)} />
        <input type='submit' value={'ADD'} />
      </form>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type='text'
                value={todo.value}
                onChange={e => handleEdit(todo.id, e.target.value)}
              />
            </li>)
        })}
      </ul>
    </>
  )
}
